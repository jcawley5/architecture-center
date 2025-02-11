---
############################################################
#                Beginning of Front Matter                 #
############################################################

# ID: [DO NOT MODIFY] - id is automatically assigned.
id: id-ra0000

# SLUG: [DO NOT MODIFY] - It will be generated (e.g. short UUID for the URL).
slug: /ref-arch/demo

# SIDEBAR_POSITION: [DO NOT MODIFY] - Position is automatically assigned.
sidebar_position: 0

# SIDEBAR_CUSTOM_PROPS: [DO NOT MODIFY] - In which additional sidebar this page should be displayed? Check its presence on the 'SAP ViewPoints'.
sidebar_custom_props: 
  category_index: 
    - demo

############################################################
#     You can modify the front matter properties below     #
############################################################

# TITLE: 50 characters max (best practice). Keep it short & concise. 
title: Reference Architecture for SAP Task Center on SAP BTP

# DESCRIPTION: A maximum of 300 characters will be displayed in the cards. For social medias, the best practice is 110 characters max Keep it short & concise. 
description: Guidance for setting up SAP Task Center service on SAP BTP. Learn about the architecture components and flow in this architecture.

# SIDEBAR_LABEL: 50 characters max (best practice). Keep it short & concise. 
sidebar_label: Establish a central inbox with SAP Task Center

 # KEYWORDS: Choose few keywords for this page.
keywords:
  - sap
  - cloud
  - demo

# IMAGE: Default is SAP logo.
image: img/logo.svg

# TAGS: Tags are displayed at the bottom of the page.
tags:
  - demo
  - azure
  - aws
  - gcp

# HIDE_TABLE_OF_CONTENTS:Do you want to hide the table of content? Default: false. You can reclaim the space on the right hand side if it is not relevant for your page.
hide_table_of_contents: true

# HIDE_TITLE: Do you want to hide the title of the page? Default: true.
hide_title: false

# TOC_MIN_HEADING_LEVEL: Minimum level for the TOC. Default: 2.
toc_min_heading_level: 2 

# TOC_MAX_HEADING_LEVEL: Maximum level for the TOC. Default: 4.
toc_max_heading_level: 4 

# DRAFT: If you set this to True, the page will not be part of the build and will not be deployed.
draft: true 

# UNLISTED: If you set this to True, the page will be part of the build, will be deployed, but will not be visible. You need to access it directly via the defined slug.
unlisted: false

# DISCUSSION: If defined, a button will be added at the bottom of the document page to jump to the matching discussion. Expected format: github:<DISCUSSION-ID> or community:<DISCUSSION-PATH>
discussion: github:195

# CONTRIBUTORS: GitHub username(s) of the main contributor(s)
contributors:
  - fabianleh

# LAST_UPDATE: Choose the author & the date of the last important update. Please use the international format YYYY-MM-DD for the date to avoid problems. It will appear at the bottom of the page.
last_update:
  date: 2025-02-11
  author: fabianleh

############################################################
#                   End of Front Matter                    #
############################################################
---


## Establish a central inbox with SAP Task Center

SAP Task Center enables integration with SAP applications to provide a single entry point for end users to access all their assigned tasks. The tasks can be accessed by end users through the SAP Task Center UI clients.

You can use SAP Task Center as a unified inbox for tasks across multiple applications with integrated user experience. Tasks from multiple SAP solutions are gathered in one list and are ready to be processed in just one click, shortening the completion time for business-critical tasks. For example, business users can process all their tasks from the connected systems, without the need to switch and log in separately into different inboxes.

This reference architecture also refers to the Process Automation cross use case pattern of the SAP Integration Solution Advisory Methodology.

<!-- The Solution Diagram in SVG format should appear before the drawio "image" -->
![image](images/sap-task-center.svg)

<!-- The drawio "image" should appear right after the Solution Diagram SVG image -->
![drawio](drawio/Establish-a-central-inbox-with-SAP-Task-Center.drawio)

## Ut wisi enim ad minim veniam

Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. 

Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. 

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.