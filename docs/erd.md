USERS --o{ VERIFICATION_CODES : has
  CATEGORIES --o{ PRODUCTS : contains

  USERS {
    uuid id PK
    string firstName
    string lastName
    string email UNIQUE
    string passwordHash
    string role "ADMIN|CUSTOMER"
    boolean isVerified
    datetime createdAt
    datetime updatedAt
  }

  VERIFICATION_CODES {
    uuid id PK
    uuid userId FK
    string channel "EMAIL|WHATSAPP"
    string code
    datetime expiresAt
    boolean isUsed
    datetime createdAt
  }

  CATEGORIES {
    uuid id PK
    string name UNIQUE
    datetime createdAt
    datetime updatedAt
  }

  PRODUCTS {
    uuid id PK
    string name
    string description
    decimal price
    string imageUrl
    int stock
    uuid categoryId FK
    datetime createdAt
    datetime updatedAt
  }