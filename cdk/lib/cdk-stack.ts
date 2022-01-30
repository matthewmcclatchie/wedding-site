import * as path from "path"
import {
  Stack,
  StackProps,
  RemovalPolicy,
  CfnOutput,
  Duration,
  aws_s3 as s3,
  aws_s3_deployment as s3Deployment,
  aws_cloudfront as cloudfront,
  aws_route53 as route53,
  aws_route53_targets as targets,
  aws_route53_patterns as patterns,
  aws_certificatemanager as certificateManager,
  aws_secretsmanager as secretsManager,
  aws_lambda as lambda,
  aws_lambda_nodejs as lambdaNode,
  aws_cloudwatch as cloudwatch,
  aws_apigateway as apiGateway,
  aws_logs as logs,
} from "aws-cdk-lib"
import { Construct } from "constructs"

const SITE_URL = "stephandmattswedding.co.uk"

export class WeddingSiteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    // Route 53 Hosted Zone
    const hostedZone = route53.HostedZone.fromLookup(
      this,
      "WeddingSiteHostedZone",
      {
        domainName: SITE_URL,
      }
    )

    // Certificate Manager
    const certificate = new certificateManager.DnsValidatedCertificate(
      this,
      "WeddingSiteCertificate",
      {
        region: "us-east-1",
        hostedZone,
        domainName: SITE_URL,
        validation:
          certificateManager.CertificateValidation.fromDns(hostedZone),
      }
    )

    // CloudFront Origin Access Identity
    const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, "OAI")

    // S3 Bucket
    const weddingSiteBucket = new s3.Bucket(this, "WeddingSiteBucket", {
      websiteIndexDocument: "index.html",
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
    })

    weddingSiteBucket.grantRead(cloudFrontOAI.grantPrincipal)

    // CloudFront
    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "WeddingSiteDistribution",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: weddingSiteBucket,
              originAccessIdentity: cloudFrontOAI,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
        viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
          certificate,
          {
            aliases: [SITE_URL],
            securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1,
            sslMethod: cloudfront.SSLMethod.SNI,
          }
        ),
      }
    )

    // S3 Deployment
    new s3Deployment.BucketDeployment(this, "WeddingSiteBucketDeployment", {
      sources: [s3Deployment.Source.asset("../build")],
      destinationBucket: weddingSiteBucket,
      distribution,
      distributionPaths: ["/*"],
    })

    // Route 53 A Record
    new route53.ARecord(this, "WeddingSiteAlias", {
      zone: hostedZone,
      recordName: SITE_URL,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
    })

    // Route 53 Redirect
    new patterns.HttpsRedirect(this, "WeddingSiteRedirect", {
      recordNames: [`www.${SITE_URL}`],
      targetDomain: SITE_URL,
      zone: hostedZone,
    })

    // Secrets Manager
    const weddingSiteGoogleApiCredentials =
      secretsManager.Secret.fromSecretNameV2(
        this,
        "WeddingSiteGoogleApiCredentials",
        "WeddingSiteGoogleApiCredentials"
      )

    // Lambda
    const rsvpHandler = new lambdaNode.NodejsFunction(this, "RsvpHandler", {
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: path.join("lambda", "rsvp", "index.ts"),
      handler: "handler",
      timeout: Duration.seconds(5),
      logRetention: logs.RetentionDays.ONE_DAY,
      environment: {
        CLIENT_EMAIL: weddingSiteGoogleApiCredentials
          .secretValueFromJson("client_email")
          .toString(),
        PRIVATE_KEY: weddingSiteGoogleApiCredentials
          .secretValueFromJson("private_key")
          .toString(),
      },
      bundling: {
        minify: true,
      },
    })

    const contactHandler = new lambdaNode.NodejsFunction(
      this,
      "ContactHandler",
      {
        runtime: lambda.Runtime.NODEJS_14_X,
        entry: path.join("lambda", "contact", "index.ts"),
        handler: "handler",
        timeout: Duration.seconds(5),
        logRetention: logs.RetentionDays.FIVE_DAYS,
      }
    )

    // CloudWatch Alarms
    const RsvpHandlerErrors = rsvpHandler.metricErrors({
      period: Duration.minutes(1),
    })

    new cloudwatch.Alarm(this, "RsvpHandlerErrorsAlarm", {
      metric: RsvpHandlerErrors,
      threshold: 1,
      comparisonOperator:
        cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
      alarmDescription:
        "Alarm if the SUM of Errors is greater than or equal to the threshold (1) for 1 evaluation period",
    })

    const ContactHandlerErrors = contactHandler.metricErrors({
      period: Duration.minutes(1),
    })

    new cloudwatch.Alarm(this, "ContactHandlerErrorsAlarm", {
      metric: ContactHandlerErrors,
      threshold: 1,
      comparisonOperator:
        cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
      alarmDescription:
        "Alarm if the SUM of Errors is greater than or equal to the threshold (1) for 1 evaluation period",
    })

    // API Gateway
    const api = new apiGateway.RestApi(this, "WeddingSiteEndpoint", {
      description: "Wedding site API Gateway",
      defaultCorsPreflightOptions: {
        allowHeaders: [
          "Content-Type",
          "X-Amz-Date",
          "Authorization",
          "X-Api-Key",
        ],
        allowMethods: ["OPTIONS", "GET", "POST"],
        allowCredentials: true,
        allowOrigins: [
          "http://localhost:3000",
          "https://d2o74iz73a72a3.cloudfront.net",
          "https://stephandmattswedding.co.uk",
        ],
      },
    })

    const rsvp = api.root.addResource("rsvp")
    rsvp.addMethod("POST", new apiGateway.LambdaIntegration(rsvpHandler))

    const contact = api.root.addResource("contact")
    contact.addMethod("POST", new apiGateway.LambdaIntegration(contactHandler))

    // Outputs
    new CfnOutput(this, "WeddingSiteBucketDomainName", {
      value: weddingSiteBucket.bucketDomainName,
    })

    new CfnOutput(this, "WeddingSiteBucketWebsiteUrl", {
      value: weddingSiteBucket.bucketWebsiteUrl,
    })

    new CfnOutput(this, "CloudFrontUrl", {
      value: distribution.distributionDomainName,
    })

    new CfnOutput(this, "ApiGatewayUrl", {
      value: api.url,
    })
  }
}
