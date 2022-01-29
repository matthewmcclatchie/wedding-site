import {
  Stack,
  StackProps,
  RemovalPolicy,
  CfnOutput,
  aws_s3 as s3,
  aws_s3_deployment as s3Deployment,
  aws_cloudfront as cloudfront,
} from "aws-cdk-lib"
import { Construct } from "constructs"

export class WeddingSiteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    // S3 Bucket
    const weddingSiteBucket = new s3.Bucket(this, "WeddingSiteBucket", {
      websiteIndexDocument: "index.html",
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
    })

    // S3 Deployment
    new s3Deployment.BucketDeployment(this, "WeddingTestBucketDeployment", {
      sources: [s3Deployment.Source.asset("../build")],
      destinationBucket: weddingSiteBucket,
    })

    // CloudFront
    const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, "OAI")

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
      }
    )

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
  }
}
