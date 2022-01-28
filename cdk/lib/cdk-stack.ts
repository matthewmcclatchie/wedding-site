import {
  Stack,
  StackProps,
  RemovalPolicy,
  CfnOutput,
  aws_s3 as s3,
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

    // Outputs
    new CfnOutput(this, "WeddingSiteBucketDomainName", {
      value: weddingSiteBucket.bucketDomainName,
    })

    new CfnOutput(this, "WeddingSiteBucketWebsiteUrl", {
      value: weddingSiteBucket.bucketWebsiteUrl,
    })
  }
}
