# The Merchant Ledger

### Elder Scrolls Online theme app where user can keep track of items to purchase at trader's

## Features

- Create a list of items you want to buy (name, desired price).

- Mark items as “found” or “bought” (update).

- Delete items when completed.

- DynamoDB: Table ShoppingList.

- Extras: Sort by price or filter “needed” vs “bought”. (filter feature)

- Tests: Add shopping list item, toggle bought status, delete item.

# DynamoDB setup

## Table:name:ShoppingList

- partition key id(string,each shopping list entry)
- one sort key -ask thomas for opinion

### Attributes ( per item) schema

- id (string)
- name(string)
- desiredPrice(number)
- status( needed,found,bought)(string)

### fetch data from dynamodb

- listAllItems("shoppingList")

## CRUD FUNCTIONS

- CREATE-add a item
- READ- get items from the table
- UPDATE- update status (needed,found,bought)
- DELETE- remove item from list.

 # Front end Capstone plan
 Frontend interface for The Merchant Ledger – an Elder Scrolls Online–themed app for managing trader shopping lists.

## Overview
Built with React and Tailwind CSS. Deployed via Vercel.
Integrates with AWS Cognito for authentication and Lambda API for backend operations.

### Tech Stack
React • Tailwind CSS  • React Router • 


