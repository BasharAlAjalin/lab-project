subgraph Client["Client Layer"]
    C1["Customer UI (React)"]
    A1["Admin Dashboard (React)"]
  end

  subgraph API["Backend Layer (Node.js / Express)"]
    R["REST API"]
    Auth["Auth Module\n(Register/Login/JWT)"]
    Verif["Verification Module\n(Strategy: Email/WhatsApp)"]
    Cat["Category Module\n(CRUD)"]
    Prod["Product Module\n(CRUD + Search/Filter)"]
    RBAC["RBAC Middleware\n(Admin/Customer)"]
  end

  subgraph Data["Data Layer"]
    DB["Database\n(PostgreSQL / MySQL)"]
  end

  subgraph Ext["External Services"]
    Email["Email Service (SMTP / Provider)"]
    WA["WhatsApp Service (API / Mock)"]
  end

  C1 -->|HTTPS (JSON)| R
  A1 -->|HTTPS (JSON)| R

  R --> RBAC
  RBAC --> Auth
  RBAC --> Cat
  RBAC --> Prod
  Auth --> Verif

  Auth --> DB
  Verif --> DB
  Cat --> DB
  Prod --> DB

  Verif --> Email
  Verif --> WA