# react-discussionview

> A responsive, reusable & customizable react component that can be used integrate group chat, messenger or discussion functionality into your application. It is a pure front-end component and does not require backend coding.

[![NPM](https://img.shields.io/npm/v/react-discussionview.svg)](https://www.npmjs.com/package/react-discussionview) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<br />
<table style="border: solid 1px; margin-left: 10px">
<tr>
<td valign="center" style="text-align: center">

<img src="https://user-images.githubusercontent.com/108924653/186316322-c2d55ca2-9ee7-46da-b854-bfd8a63c7258.png" height="40" /> 
<br />
React

</td>
<td valign="center" style="text-align: center">

<img src="https://user-images.githubusercontent.com/108924653/186323459-68acfb91-f707-4184-a2c2-9aa96337067c.png" height="40" /> 
<br />
AWS Serverless

</td>
<td valign="center" style="text-align: center">

<img src="https://user-images.githubusercontent.com/108924653/186630282-c2500c7b-d030-49e3-a359-b3ec47937eb5.png" height="40" /> 
<br />
Bootstrap

</td>
</tr>
</table>

<br />

<img src="https://user-images.githubusercontent.com/108924653/186903918-955a721a-ca8e-48ba-821f-94cc996b342c.png" width="450"/>

<br />

## On This Page

- [Introduction](#introduction)
- [Use Cases](#use-cases)
- [Features](#features)
- [Functionality](#functionality)
- [Quickstart](#quickstart)
- [Props](#props)
- [More Features](#more-features)
- [Customization](#customization)
- [AWS Configuration](#aws-configuration)
- [Tests](#tests)


<br />

## Introduction 

Use this flexible, customizable and reusable React component to develop group chat, messenger or discussion functionality into your application. It is packed with functionality, keeping the basic usage simple. It is designed in Bootstrap, is responsive and renders nicely on all screen sizes. Customizable color scheme allows it to seamlessly blend in to any UI. It depends on AWS serverless technologies for certain functionalities such as uploading & processing attachments and for database store. However, it is a pure front-end component and does not need backend coding. 

[Back To Top ▲](#on-this-page)

<br />

## Use Cases

Possible usage of this component includes but is not limited to the following use-cases:
- Development of a chat / group chat / messenger module
- Development of a web based forum module
- Development of a social network
- Development of a topic-based commenting / discussion module

and many more.

[Back To Top ▲](#on-this-page)

<br />

## Features

- **Reusable** - It can be integrated easily into your react application, in any place, where a discussion or chat functionality is required. It allows multiple instances on a single page.
- **Responsive** - UI is designed in bootstrap, is fully responsive and renders nicely on all screen sizes.
- **Customizable** - The color scheme of this component is customizable. It can be changed to blend in with any UI.
- **Pure Front-end** - This is a pure front-end react component and backend coding is not required. For certain functionalities that need a backend, AWS configuration is required and is explained in the subsequent sections.

[Back To Top ▲](#on-this-page)

<br />

## Functionality

This component provides the following functionality:

<br />

- **Text Input** - Auto-resizable text area component to accept textual input
- **Emoji Support** - More than 1100 standard emojis are available to choose from
- **Image Upload** - Supports image attachments (preview & cropping integrated)
- **PDF Upload** - Supports pdf attachments (preview integrated)
- **Video Upload** - Supports video attachments (preview, thumbnail generation & video start-end clipping integrated)
- **Likes** - Allow users to like
- **Dislikes** - Allow users to dislike
- **Votes** - Allow users to upvote or downvote
- **Share** - Allow users to share
- **Reply** - Allow users to reply to any particular comment
- **Replied To** - Show the source comment summary, to which the current comment is a reply to

[Back To Top ▲](#on-this-page)

<br />

## Quickstart

Read this section to get started with the implementation and the basic usage. After you become familiar, you can move on to explore [props](#props), [further features](#more-use-cases) and [customization](#customization).

<br />

### Before You Begin

<br />

<u>Install Dependencies</u>

This module depends on the following packages. Install them first.

```bash

npm install --save aws-sdk
npm install --save bootstrap
npm install --save react-bootstrap
npm install --save react-bootstrap-icons
npm install --save react-ui-components-superflows
npm install --save react-ui-themes-superflows
npm install --save react-upload-to-s3
npm install --save react-commentview

```

- **AWS SDK** is used for uploading attachments such as images, pdfs and videos.
- **Bootstrap** is the framework, which this component uses for design and layouting
- **UI Components** contains some specially designed components (developed by us) that are used by this component
- **UI Themes** contains some specially designed themes (developed by us) that are used by this component
- **Upload To S3** is developed by us and used to process attachments and to upload them to aws
- **Comment View** is developed by us and is the basic comment UI building block, which gets reused throughout this component

<br />

<u>AWS Configuration</u>

Following AWS services are used by this component:
- **IAM** for access credentials and permissions
- **S3** for attachment storage
- **MediaConvert** for video attachment processing
- **DynamoDB** for database storage of discussion data

The [configuration section](#aws-configuration) will help you in your AWS setup.

<br />

### Install

```bash
npm install --save react-discussionview
```

<br />

### Basic Usage

Use this component to quickly add a discussion or a chat / group feature into your application. After you become familiar with the basic usage, you can move on to exploring the [props](#props), [further features](#further-features) and [customization](#customization).

<br />

```jsx
import React from 'react'

import { Col, Row, Container } from 'react-bootstrap';
import { DiscussionView } from 'react-discussionview'
import Themes from 'react-ui-themes-superflows'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const theme = Themes.getTheme("Default");

  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col sm={12} xs={12} md={8} xl={6} xxl={6} >
          <DiscussionView
            awsRegion="your_aws_region_where_s3_bucket_and_table_is_hosted"
            awsKey="your_aws_access_key"
            awsSecret="your_aws_secret"
            awsMediaConvertEndPoint="your_aws_mediaconvert_endpoint"
            mediaConvertRole="your_aws_mediaconvert_role"
            topicId="4"
            table="your_dynamodb_table_name"
            bucket="your_aws_s3_bucket_name"
            userId="23"
            userName="Kaushiki M"
            userPicture="https://superflows-myuploads.s3.ap-south-1.amazonaws.com/profile_girl_100.png"
            theme={theme}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App

```

<br />

Immediately after initialization, your discussion will not have any data. So you will only see the editor.

<img src="https://user-images.githubusercontent.com/108924653/187027999-0473c4b4-ac85-4adc-bc37-aebeaccbabc7.png" width="450"/>

<br />

Type in something and submit it.

<img src="https://user-images.githubusercontent.com/108924653/187028152-57e80e05-51cc-4c06-a5bd-ee264b3eb2e1.png" width="450"/>

<br />

Whatever you have entered and submitted, will be reflected as a chat box just above the editor. Type in something more!

<img src="https://user-images.githubusercontent.com/108924653/187028399-254b8075-c0ed-4f97-b900-59eb974af2c8.png" width="450"/>

<br />

Your second chat is also now visible. What if you wish to add a new user to chat? It's quite simple actually, just change the user-related props! See the below example.

```jsx
import React from 'react'

import { Col, Row, Container } from 'react-bootstrap';
import { DiscussionView } from 'react-discussionview'
import Themes from 'react-ui-themes-superflows'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const theme = Themes.getTheme("Default");

  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col sm={12} xs={12} md={8} xl={6} xxl={6} >
          <DiscussionView
            awsRegion="your_aws_region_where_s3_bucket_and_table_is_hosted"
            awsKey="your_aws_access_key"
            awsSecret="your_aws_secret"
            awsMediaConvertEndPoint="your_aws_mediaconvert_endpoint"
            mediaConvertRole="your_aws_mediaconvert_role"
            topicId="4"
            table="your_dynamodb_table_name"
            bucket="your_aws_s3_bucket_name"
            userId="21"
            userName="Hrushi M"
            userPicture="https://superflows-myuploads.s3.ap-south-1.amazonaws.com/profile_boy_100.jpeg"
            theme={theme}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App

```

<img src="https://user-images.githubusercontent.com/108924653/187028556-3d3711ef-a04c-4953-bcc8-d0a4cb275a84.png" width="450"/>

<br />

You'll see that the chat has remained the same but the user at the bottom editor has changed. This essentially means that you are now using the chat as a different user. This is achieved by changing the user-related props - userId, userName, userPicture.

<br />

Go ahead, type in something with the new user!

<img src="https://user-images.githubusercontent.com/108924653/187028731-6d764285-571d-4ffb-a968-e70960ec8b5d.png" width="450"/>

<br />

You'll see that your chat input from the new user is now showing in the chatroom! 

<br />

The quickstart section ends here. You can now move on to the props section, to understand the props in detail.

[Back To Top ▲](#on-this-page)

<br />

## Props

Use the table below to understand the props and how they can be set to customize the appearance and behaviour of this component. For AWS related props, please refer to the [AWS configuration](#aws-configuration) section to know how to obtain your values for these props.

| Prop                       | Type        | Description
|----------------------------|-------------|-------------------------------------------------------------------------------------
| bucket                     | string      | name of your s3 bucket where attachments will be uploaded (aws)
| awsRegion                  | string      | name of the aws region where s3 bucket is hosted (aws)
| awsKey                     | string      | aws access key (recommended that it should be stored in environment variables) (aws)
| awsSecret                  | string      | aws secret (recommended that it should be stored in environment variables) (aws)
| awsMediaConvertEndPoint    | url string  | aws media convert endpoint (aws)
| mediaConvertRole           | string      | name of aws media convert role (aws)
| cdnPrefix                  | url string  | prefix in case your s3 bucket is behind cdn (aws)
| table                      | string      | dynamodb table name, which stores the discussion / chat data
| topicId                    | string      | topic id, chats are grouped by topicId
| bucket                     | string      | name of the s3 bucket that stores attachments such as images, videos and pdfs
| userId                     | string      | id of the current user
| userName                   | string      | name of the current user
| userPicture                | string      | picture of the current user
| enableLikes                | boolean     | flag, which enables or disables the like functionality
| enableDisLikes             | boolean     | flag, which enables or disables the dislike functionality
| enableVotes                | boolean     | flag, which enables or disables the votes functionality
| enableFilters              | boolean     | flag, which enables or disables the filter functionality
| enableSearch               | boolean     | flag, which enables or disables the search functionality

[Back To Top ▲](#on-this-page)

<br />

## More Features

See the below examples to know the various features of this component.

### Likes

Likes functionality can be enabled by setting the enableLikes prop.

```jsx
  <DiscussionView
    awsRegion="your_aws_region_where_s3_bucket_and_table_is_hosted"
    awsKey="your_aws_access_key"
    awsSecret="your_aws_secret"
    awsMediaConvertEndPoint="your_aws_mediaconvert_endpoint"
    mediaConvertRole="your_aws_mediaconvert_role"
    topicId="4"
    table="your_dynamodb_table_name"
    bucket="your_aws_s3_bucket_name"
    userId="21"
    userName="Hrushi M"
    enableLikes={true}
    userPicture="https://superflows-myuploads.s3.ap-south-1.amazonaws.com/profile_boy_100.jpeg"
    theme={theme}
  />
```

<img src="https://user-images.githubusercontent.com/108924653/187032775-a485808c-340e-4d5d-bc40-fb1eeea380e7.png" width="450"/>

<br />

### Dislikes

Dislike functionality can be enabled by setting the enableDisLikes prop.

```jsx
  <DiscussionView
    awsRegion="your_aws_region_where_s3_bucket_and_table_is_hosted"
    awsKey="your_aws_access_key"
    awsSecret="your_aws_secret"
    awsMediaConvertEndPoint="your_aws_mediaconvert_endpoint"
    mediaConvertRole="your_aws_mediaconvert_role"
    topicId="4"
    table="your_dynamodb_table_name"
    bucket="your_aws_s3_bucket_name"
    userId="21"
    userName="Hrushi M"
    enableLikes={true}
    enableDisLikes={true}
    userPicture="https://superflows-myuploads.s3.ap-south-1.amazonaws.com/profile_boy_100.jpeg"
    theme={theme}
  />
```

<img src="https://user-images.githubusercontent.com/108924653/187032694-abd5bafa-3888-4646-89ce-539baf116f84.png" width="450"/>

<br />

### Voting

Voting functionality can be enabled by setting the enableVotes prop.

```jsx
  <DiscussionView
    awsRegion="your_aws_region_where_s3_bucket_and_table_is_hosted"
    awsKey="your_aws_access_key"
    awsSecret="your_aws_secret"
    awsMediaConvertEndPoint="your_aws_mediaconvert_endpoint"
    mediaConvertRole="your_aws_mediaconvert_role"
    topicId="4"
    table="your_dynamodb_table_name"
    bucket="your_aws_s3_bucket_name"
    userId="21"
    userName="Hrushi M"
    enableVotes={true}
    userPicture="https://superflows-myuploads.s3.ap-south-1.amazonaws.com/profile_boy_100.jpeg"
    theme={theme}
  />
```

<img src="https://user-images.githubusercontent.com/108924653/187032958-31fe3680-4d77-4157-a21a-a324ce2578cd.png" width="450"/>

<br />

### Filters

Filter your chats based on predefined time intervals. Enable this option by setting the enableFilters prop.

```jsx
  <DiscussionView
    awsRegion="your_aws_region_where_s3_bucket_and_table_is_hosted"
    awsKey="your_aws_access_key"
    awsSecret="your_aws_secret"
    awsMediaConvertEndPoint="your_aws_mediaconvert_endpoint"
    mediaConvertRole="your_aws_mediaconvert_role"
    topicId="4"
    table="your_dynamodb_table_name"
    bucket="your_aws_s3_bucket_name"
    userId="21"
    userName="Hrushi M"
    enableVotes={true}
    enableFilters={true}
    userPicture="https://superflows-myuploads.s3.ap-south-1.amazonaws.com/profile_boy_100.jpeg"
    theme={theme}
  />
```

<img src="https://user-images.githubusercontent.com/108924653/187042225-3781bebb-bd5c-4f04-89b7-c3559cfaabea.png" width="450"/>

<br />

### Search

Search feature can be enabled by setting the enableSearch prop.

```jsx
  <DiscussionView
    awsRegion="your_aws_region_where_s3_bucket_and_table_is_hosted"
    awsKey="your_aws_access_key"
    awsSecret="your_aws_secret"
    awsMediaConvertEndPoint="your_aws_mediaconvert_endpoint"
    mediaConvertRole="your_aws_mediaconvert_role"
    topicId="4"
    table="your_dynamodb_table_name"
    bucket="your_aws_s3_bucket_name"
    userId="21"
    userName="Hrushi M"
    enableVotes={true}
    enableFilters={true}
    enableSearch={true}
    userPicture="https://superflows-myuploads.s3.ap-south-1.amazonaws.com/profile_boy_100.jpeg"
    theme={theme}
  />
```

<img src="https://user-images.githubusercontent.com/108924653/187042347-c901f6f1-2e3b-4355-b615-2bb7918a5288.png" width="450"/>

<br />

[Back To Top ▲](#on-this-page)

<br />

## Customization

Appearance customization can be done by modifying the theme object that is passed as a prop. Customizable properties of this component are listed below.

- commentViewBorderColor
- commentViewBackgroundColor
- commentViewUserColor
- commentViewReplyToBackgroundColor
- commentViewReplyToTitleColor
- commentViewColor
- commentViewDecorationColor
- commentViewDecorationHighlightColor
- uploadToS3BackgroundColor
- discussionViewBackgroundColor

Before passing the theme object as prop to the component, you can change these colors as you wish so that component blends in perfectly in your user interface.

<br />

### Night mode colors

This example demonstrates how the theme object can be modified to change the color scheme to night mode.

```jsx
import React from 'react'

import { Col, Row, Container } from 'react-bootstrap';
import { DiscussionView } from 'react-discussionview'
import Themes from 'react-ui-themes-superflows'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const theme = Themes.getTheme("Default");
  theme.commentViewBorderColor = '#dddddd'
  theme.commentViewBackgroundColor = '#000000'
  theme.commentViewMyBackgroundColor = '#002200'
  theme.commentViewUserColor = '#ffffff'
  theme.commentViewColor = '#dddddd'
  theme.commentViewReplyToBackgroundColor = '#222222';
  theme.commentViewReplyToTitleColor = '#cccccc';
  theme.commentViewDecorationColor = '#999999';
  theme.commentViewDecorationHighlightColor = '#dddddd';
  theme.uploadToS3BackgroundColor = '#efefef';
  theme.discussionViewBackgroundColor = '#333333';

  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col sm={12} xs={12} md={8} xl={6} xxl={6} >
          <DiscussionView
            awsRegion="your_aws_region_where_s3_bucket_and_table_is_hosted"
            awsKey="your_aws_access_key"
            awsSecret="your_aws_secret"
            awsMediaConvertEndPoint="your_aws_mediaconvert_endpoint"
            mediaConvertRole="your_aws_mediaconvert_role"
            topicId="4"
            table="your_dynamodb_table_name"
            bucket="your_aws_s3_bucket_name"
            userId="21"
            userName="Hrushi M"
            userPicture="https://superflows-myuploads.s3.ap-south-1.amazonaws.com/profile_boy_100.jpeg"
            enableVotes={true}
            enableFilters={true}
            enableSearch={true}
            theme={theme}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App

```

<img src="https://user-images.githubusercontent.com/108924653/187044828-f66c528b-2b65-4acb-b55b-a1fac041ca06.png" width="450"/>

<br />

## AWS Configuration

### AWS S3

- Create an S3 bucket via the AWS admin console, say name of the bucket is **myuploads**
- Set the bucket policy as follows
```bash
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicListGet",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:List*",
                "s3:Get*"
            ],
            "Resource": [
                "arn:aws:s3:::myuploads",
                "arn:aws:s3:::myuploads/*"
            ]
        }
    ]
}
```
- Set the cors policy as follows
```bash
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "DELETE",
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```

### AWS IAM

#### SDK User

- Create an SDK user via the AWS console so that you get access to aws region, aws access key and aws secret, i.e. aws credentials.
- Ensure that you preserve these credentials in a secure manner.
- It is especially important that these credentials be stored in the environment files and should never be pushed to a source repository such as git.
- For this SDK user, give create, add, edit, delete permissions to your S3 bucket via the AWS console. I usually give full access restricted to a particular bucket, like the one which we created in the S3 section above

```bash

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:*",
                "s3-object-lambda:*"
            ],
            "Resource": "arn:aws:s3:::myuploads"
        }
    ]
}

```

- For this SDK user, then give the user access to AWS mediaconvert via the AWS console. I have used AWSElementalMediaConvertFullAccess, which is a pre-created AWS policy for this. To find and attach this policy - Select your IAM user > Click add permissions on the user summary screen > Click attach existing policies directly > Search mediaconvert > Apply the AWSElementalMediaConvertFullAccess policy
- For this SDK user, give create, add, edit, delete permissions to your DynamoDB table as well.


#### MediaConvert Role

- Goto IAM > Roles
- Select AWS Service as the trusted entity type
- Choose MediaConvert from the services dropdown
- Click next on add permissions
- Name the role as per your choice. I have named it **mediaconvert_role**. (Remember that this role name has to be given as a prop to the upload-to-s3 component, refer to the Usage section)

### AWS MediaConvert

AWS mediaconvert is required for video processing. The clip selection happens at the client end, whereas the actual clipping is done by an AWS mediaconvert job. This requires a region specific endpoint and can be easily obtained from the aws cli (aws commandline).

```bash
aws mediaconvert describe-endpoints --region <region>
```

Remember that this region specific endpoint also has to be provided as a prop to the upload-to-s3 component. (Refer to the Usage Section)

Once you are through with installing the dependencies and the AWS configuration, using the component becomes fairly simple. Please refer to the Usage below.

### AWS DynamoDB

This component uses dynamodb as the backend. Please create a table as follows. You can use a name of your choice but remember to use the same name in the props.

Name: Discussions / "your_dynamodb_table_name"
Partition Key: topicId (String)
Sort Key: timestamp (number)

As mentioned above, don't forget to provide CRUD access to this table to your SDK user.

<br />

## Tests

PASS src/index.test.js (74.1s)
- ✓ DiscussionView: Render of empty module (1070ms)
- ✓ DiscussionView: Render of empty module with filter (3026ms)
- ✓ DiscussionView: Render of empty module with search (3044ms)
- ✓ DiscussionView: Render pre-existing items (1017ms)
- ✓ DiscussionView: Submit new text (4027ms)
- ✓ DiscussionView: Render pre-existing items with likes (user hasn't liked) (1017ms)
- ✓ DiscussionView: Render pre-existing items with likes (user has liked) (1011ms)
- ✓ DiscussionView: Render pre-existing items with votes (user hasn't voted) (1019ms)
- ✓ DiscussionView: Render pre-existing items with votes (user has upvoted) (1012ms)
- ✓ DiscussionView: Render pre-existing items with votes (user has downvoted) (1013ms)
- ✓ DiscussionView: Render pre-existing items with likes. User then likes an item (3022ms)
- ✓ DiscussionView: Render pre-existing items with likes. User then removed the like of an item (5020ms)
- ✓ DiscussionView: Render pre-existing items with upvotes. User then upvotes an item (3016ms)
- ✓ DiscussionView: Render pre-existing items with upvotes. User then removes the upvote of an item (5022ms)
- ✓ DiscussionView: Render pre-existing items with downvotes. User then downvotes an item (3016ms)
- ✓ DiscussionView: Render pre-existing items with downvotes. User then removes the downvote of an item (5023ms)
- ✓ DiscussionView: Search flow (3023ms)
- ✓ DiscussionView: Filters flow (6043ms)
- ✓ DiscussionView: Edit flow (5065ms)
- ✓ DiscussionView: Delete flow (4040ms)
- ✓ DiscussionView: Render pre-existing items with dislikes. User then dislikes an item (3016ms)
- ✓ DiscussionView: Render pre-existing items with dislikes. User then removed the dislike of an item (5018ms)
- ✓ DiscussionView: Reply flow (3032ms)

-------------------|----------|----------|----------|----------|-------------------|
File               |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-------------------|----------|----------|----------|----------|-------------------|
All files          |    80.95 |    55.24 |    86.67 |    82.71 |                   |
 Constants.js      |      100 |      100 |      100 |      100 |                   |
 DiscussionView.js |    93.75 |    74.18 |    92.86 |    93.44 |... 11,559,642,712 |
 Services.js       |     7.69 |      100 |        0 |     7.69 |... 40,44,45,46,47 |
 Util.js           |        0 |        0 |        0 |        0 |... 21,22,23,24,25 |
 index.js          |        0 |        0 |        0 |        0 |                   |
-------------------|----------|----------|----------|----------|-------------------|
Test Suites: 1 passed, 1 total
Tests:       23 passed, 23 total
Snapshots:   0 total
Time:        76.165s
Ran all test suites.

## License

MIT © [superflows-dev](https://github.com/superflows-dev)
