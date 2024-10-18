# layout

## header:

1- logo
2- navbar:
=> home
=> items (products)
=> invoices (orders)
=> about
=> dashboard "admin"
3- icons
=> language
=> moood
=> notifications
=> profile

## footer

# routes

## home:

1- banner (search)
2- categories
3- items per unit / category
4- contact || about

## dashboard

1- sidebar
=> units
=> colors
=> categories
=> items
=> currencies
=> taxes
=> users
=> store
2- body
=> add button (not within currencies & taxes)
=> content (table)
=> pagination
-- store
=> add Inventory
=> accept / reject

## auth

1- login (token => userData)
=> username
=> password
2- register
=> firstName
=> lastName
=> userName
=> email
=> password
=> gmail
=> phoneNumber

# endpoints

## missed

1- forget password
2- verify
3- update profile
4- can register

## responses

### GeneralData

#### AddColor / AddUnit

=> name(Ar / En)
=> ratio "unit"

1- state ??
2- data
3- count
4- message(Ar / En)
5- errorMessage

#### Colors / Units / ItemsCategories / Currencies / Taxes

1- id
2- name(Ar / En)

### Identity

#### AddUserRole

=> role
=> user ??

1- status

#### Register

=> firstName
=> lastName
=> userName
=> email
=> password
=> gmail
=> phoneNumber

1- state
2- data
-- message
-- isAuthenticated
-- userName
-- fullName
-- email
-- roles []
-- token
-- expiredOn
3- count ??
4- message(Ar / En)
5- errorMessage

#### Token

=> userName
=> password

1- state
2- data
-- message
-- isAuthenticated
-- userName
-- fullName
-- email
-- roles []
-- token
-- expiredOn
3- count ??
4- message(Ar / En)
5- errorMessage

#### UserData

=> Token (within header)

1- state
2- data
2.1- user
-- id
-- userName
-- normalizedUserName
-- email
-- normalizedEmail
-- emailConfirmed
-- passwordHash
-- securityStamp
-- concurrencyStamp
-- phoneNumber
-- phoneNumberConfirmed
-- twoFactorEnabled
-- lockoutEnd
-- lockoutEnabled
-- accessFailedCount
-- firstName
-- lastName
-- picSource
-- passDeebHash
-- gmail
-- nationalId
-- deepLocked
2.2- roles []
3- count ??
4- message(Ar / En)
5- errorMessage

#### IsAuthenticate

=> Token (within header)

1- status

### Invoice

#### AddInvoice_Purchase / AddInvoice_Sales

=> ref
=> customerName
=> transactionDate
=> branchId
=> currencyId
=> details [{}]
-- itemId
-- itemDescription
-- storeId
-- unitId
-- quantity
-- unitPrice
-- discount
-- taxes [{}]
---- taxId
---- percentage
---- amount

1- state
2- data
3- count
4- messageAr
5- messageEn
6- errorMessage
