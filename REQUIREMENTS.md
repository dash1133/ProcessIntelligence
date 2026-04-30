# Requirements Document — AI-Powered Workspace Platform

> This document is split into three parts:
> - **Part A — Core Platform**: Domain-agnostic product engine. App types, LLM Core, composition model, design system, data layer. This is what you build once and deploy everywhere.
> - **Part B — User Administration**: Multi-tenant operations layer. Tenancy, workspaces, RBAC, sharing, templates. This governs who gets what.
> - **Part C — Domain Pack Specification**: The contract a domain plugin must fulfill to activate the platform for a specific industry.
>
> **Tenancy model:** The platform is multi-tenant. Each **tenant** (organization) is a fully isolated unit with its own users, data, Domain Packs, roles, and workspaces — analogous to Claude Teams.

---

# PART A — CORE PLATFORM

Everything in Part A is industry-independent and tenant-agnostic. A developer implementing Part A should never need to know what industry the platform will serve or how tenants are managed.

---

## A1. Architecture Overview

The platform is a **multi-tenant workspace system**. Each tenant (organization) contains users who each have personal workspaces. At the center is a **Claude LLM Core** that powers all intelligent behavior. Domain expertise is injected at runtime through a **Plugin layer** (Domain Packs containing skills, MCP servers, and data connectors). Users interact through a set of composable **App Types** that are configured by the active Domain Pack.

```
┌─────────────────────────────────────────────────────────────────────┐
│                         PLATFORM (Multi-Tenant)                     │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ TENANT (Organization)                                         │  │
│  │                                                               │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │ USER WORKSPACE                                          │  │  │
│  │  │                                                         │  │  │
│  │  │  ┌────────┐ ┌────────┐ ┌──────────┐ ┌──────────────┐   │  │  │
│  │  │  │  Chat  │ │ Alerts │ │   Grid   │ │  Simulator   │   │  │  │
│  │  │  │App Type│ │App Type│ │  Builder │ │  App Type    │   │  │  │
│  │  │  └───┬────┘ └───┬────┘ └────┬─────┘ └──────┬───────┘   │  │  │
│  │  │      └──────────┴───────────┴───────────────┘           │  │  │
│  │  │                         │                               │  │  │
│  │  │               ┌─────────▼──────────┐                    │  │  │
│  │  │               │  Claude LLM Core   │      ◄── Part A    │  │  │
│  │  │               └─────────┬──────────┘                    │  │  │
│  │  │                         │                               │  │  │
│  │  │          ┌──────────────▼───────────────┐               │  │  │
│  │  │          │  Plugin Layer (Domain Pack)  │  ◄── Part C   │  │  │
│  │  │          │  Skills · MCP · Connectors   │               │  │  │
│  │  │          └──────────────────────────────┘               │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  │                                                               │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │  Tenant Admin · RBAC · Sharing · Templates              │  │  │
│  │  │                                                  Part B │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ PLATFORM ADMIN (Super-Admin)                          Part B │  │
│  │ Tenant provisioning · Billing · Domain Pack catalog          │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## A2. App Types

Each app type is a standalone, composable UI pattern. App types can be used individually or combined. The Domain Pack (Part C) determines which app types are active and how they are configured.

### A2.1 Chat

A conversational interface where the user interacts with the Claude LLM Core in natural language.

| ID | Requirement | Priority |
|----|-------------|----------|
| CHAT-01 | Two-way message thread with user and assistant roles | Must |
| CHAT-02 | Rich text rendering in assistant responses (bold, lists, headings, code blocks) | Must |
| CHAT-03 | Timestamped messages | Must |
| CHAT-04 | Quick-action suggestion buttons — labels and prompts are defined by the Domain Pack | Must |
| CHAT-05 | Text input with keyboard submit (Enter key) | Must |
| CHAT-06 | Voice input mode (microphone toggle with listening indicator) | Should |
| CHAT-07 | Auto-scroll to latest message | Must |
| CHAT-08 | Context-aware responses — LLM has access to all workspace data visible in other app types | Must |
| CHAT-09 | Cross-app-type deep linking — other app types can inject a message into Chat and switch to it | Must |
| CHAT-10 | Streaming response rendering | Should |
| CHAT-11 | Conversation history persistence across sessions | Should |

### A2.2 Alerts

A prioritized feed of AI-generated insights, anomalies, and recommended actions.

| ID | Requirement | Priority |
|----|-------------|----------|
| ALRT-01 | Alert cards with priority classification — priority levels are configurable by the Domain Pack (default: critical / high / medium / low) | Must |
| ALRT-02 | Visual priority indicators — color-coded badges and border accents | Must |
| ALRT-03 | AI confidence score displayed per alert (numeric + visual meter) | Must |
| ALRT-04 | Expandable/collapsible detail panel per alert | Must |
| ALRT-05 | Structured detail sections per alert — section labels and structure are defined by the Domain Pack (default: Analysis, Recommendation, Projected Impact) | Must |
| ALRT-06 | Affected entities list per alert — entity type and display format are defined by the Domain Pack | Must |
| ALRT-07 | Configurable action buttons per alert — each button navigates to another app type with context. Actions are defined by the Domain Pack | Must |
| ALRT-08 | Global notification badge showing count of highest-priority alerts | Must |
| ALRT-09 | Real-time alert generation — LLM continuously monitors data and creates alerts | Should |
| ALRT-10 | Alert acknowledgment / dismissal workflow | Should |
| ALRT-11 | Alert filtering and sorting (by priority, confidence, recency) | Should |

### A2.3 Grid Builder

A tabular/matrix view for displaying and comparing entities across multiple dimensions. Supports two variants: **table** (rows of entities) and **card grid** (metric cards with status indicators).

| ID | Requirement | Priority |
|----|-------------|----------|
| GRID-01 | **Table variant:** Configurable columns — labels, alignment, and data types are defined by the Domain Pack | Must |
| GRID-02 | Row-level data binding — each row represents an entity from the data layer | Must |
| GRID-03 | Classification badges with color coding — classification scheme is defined by the Domain Pack | Must |
| GRID-04 | Conditional formatting — value styling rules (thresholds, color bands) are defined by the Domain Pack | Must |
| GRID-05 | Row click action — navigates to Chat with context about the selected entity | Must |
| GRID-06 | Header with entity count and legend for the active classification scheme | Must |
| GRID-07 | Column sorting | Should |
| GRID-08 | Column filtering and search | Should |
| GRID-09 | Exportable to CSV / shareable as snapshot | Should |
| GRID-10 | **Card grid variant:** Grid of metric cards with status dot, trend arrow, current value, and target — all field mappings defined by the Domain Pack | Must |
| GRID-11 | Card grid sections — cards organized into labeled groups. Group names and membership are defined by the Domain Pack | Must |
| GRID-12 | Card click action — navigates to Chat with deep-dive context about the selected metric | Must |
| GRID-13 | Time period selector — available periods defined by the Domain Pack | Should |

### A2.4 Simulator

A what-if scenario modeling tool where users adjust variables and see projected outcomes. Powered by the LLM Core for narrative interpretation.

| ID | Requirement | Priority |
|----|-------------|----------|
| SIM-01 | Scenario cards — each represents a distinct scenario with title and description, defined by the Domain Pack | Must |
| SIM-02 | Baseline vs. Projected side-by-side display — field labels and values from the Domain Pack | Must |
| SIM-03 | Configurable metadata fields per scenario — the Domain Pack defines which summary fields to show. The platform renders them generically | Must |
| SIM-04 | Adjustable variable sliders — each scenario has N configurable parameters with min/max/default/unit, defined by the Domain Pack | Must |
| SIM-05 | Show/hide variable panel toggle | Must |
| SIM-06 | "Run Scenario" action — transitions to Chat with full scenario context | Must |
| SIM-07 | "Ask AI to recommend" — LLM suggests which scenario to run based on current data | Must |
| SIM-08 | Dynamic recalculation of projected outcomes when variables change | Should |
| SIM-09 | Scenario result persistence — save and compare multiple runs | Should |
| SIM-10 | Multi-scenario comparison view | Should |

---

## A3. Claude LLM Core

The LLM Core is the intelligence layer. It is not an app type — it is the engine that powers all app types. It is domain-agnostic; domain behavior comes from the system prompt fragments and tools injected by the Domain Pack.

### A3.1 Core Capabilities

| ID | Requirement | Priority |
|----|-------------|----------|
| LLM-01 | Claude API integration as the primary inference engine | Must |
| LLM-02 | System prompt architecture — base platform prompt + Domain Pack prompt fragments, composed at runtime | Must |
| LLM-03 | Context injection — all workspace data (metrics, alerts, entities, scenarios) is available to the LLM as structured context | Must |
| LLM-04 | Intent-aware responses — LLM adapts output based on the user's query topic. Topic vocabulary comes from the Domain Pack | Must |
| LLM-05 | Formatted output — LLM produces rich text with bold, lists, and structured sections | Must |
| LLM-06 | Proactive analysis — LLM generates alerts and insights without user prompting (background agent) | Should |
| LLM-07 | Multi-turn conversation with full history context | Must |
| LLM-08 | Tool use — LLM can invoke tools (query data, run calculations, call external APIs) registered by the Domain Pack via MCP | Must |
| LLM-09 | Streaming responses with incremental rendering | Should |

### A3.2 Interaction Patterns

| ID | Requirement | Priority |
|----|-------------|----------|
| LLM-10 | Direct chat — user types/speaks a question, LLM responds | Must |
| LLM-11 | Quick actions — pre-defined prompts surfaced as buttons, labels from Domain Pack | Must |
| LLM-12 | Cross-app invocation — other app types trigger LLM conversations with pre-filled context | Must |
| LLM-13 | Alert generation — LLM analyzes data and produces prioritized, confidence-scored alerts | Must |
| LLM-14 | Scenario narration — LLM interprets scenario variables/results and produces human-readable projections | Must |

---

## A4. Plugin Layer — Domain Pack Interface

The Plugin Layer defines the **contract** that a Domain Pack must implement. The platform consumes this contract to configure itself for any industry. See Part C for the full specification.

### A4.1 Plugin Architecture

| ID | Requirement | Priority |
|----|-------------|----------|
| PLG-01 | A Domain Pack is a bundle of: system prompt fragments, skill definitions, MCP server declarations, data schemas, and UI configuration | Must |
| PLG-02 | A workspace can have one or more Domain Packs active simultaneously | Must |
| PLG-03 | Domain Packs are installed/activated at the tenant or workspace level (governed by Part B permissions) | Must |
| PLG-04 | Domain Pack marketplace / catalog for discovery and installation (governed by Part B) | Should |

### A4.2 Domain Pack Contract (what a Domain Pack must provide)

| ID | Component | Description | Priority |
|----|-----------|-------------|----------|
| PLG-05 | **System Prompt Fragments** | Domain-specific instructions appended to the LLM's base prompt — terminology, analysis frameworks, persona, guardrails | Must |
| PLG-06 | **Skill Definitions** | Named capabilities the LLM can invoke — each skill has a name, description, input schema, and output schema | Must |
| PLG-07 | **MCP Server Declarations** | External tool/data integrations following the Model Context Protocol — database queries, API calls, file access, third-party systems | Must |
| PLG-08 | **Data Schemas** | Structured definitions of entity types, metric types, relationships, and hierarchies the domain works with | Must |
| PLG-09 | **UI Configuration** | Specifies: which app types to activate, sidebar labels/icons, grid column definitions, card grid section groupings, alert priority levels, alert detail section structure, scenario templates with variables, quick-action button labels, time period options, classification/tier schemes with colors | Must |
| PLG-10 | **Sample Data / Seed Content** | Example data for onboarding, demonstration, and testing | Should |

### A4.3 UI Configuration Schema (what PLG-09 contains)

The UI Configuration is the key bridge between the domain-agnostic platform and the domain-specific experience:

| Config Area | What It Defines |
|-------------|-----------------|
| **App Types** | Which app types are enabled, sidebar order, labels, and icons |
| **Chat** | Quick-action button labels and prompt templates |
| **Alerts** | Priority levels and colors, detail section labels, action button labels and target app types |
| **Grid (Table)** | Column definitions (label, field, alignment, data type), classification scheme (tier names, colors), conditional formatting rules (thresholds, color bands) |
| **Grid (Cards)** | Section groups (name, member metrics), card field mappings (value, unit, trend, target, status), status-to-color mapping |
| **Simulator** | Scenario definitions (title, description, baseline fields, projected fields, metadata fields, variables with min/max/default/unit) |
| **Time Periods** | Available period options and default selection |
| **Entity Labels** | Singular/plural nouns for the primary entity type |

---

## A5. Cross-Cutting Requirements

### A5.1 Navigation & Layout

| ID | Requirement | Priority |
|----|-------------|----------|
| NAV-01 | Persistent sidebar navigation with app type icons and labels (from Domain Pack UI config) | Must |
| NAV-02 | Global header with workspace identity, status indicators, and notification badge | Must |
| NAV-03 | Active view indicator in sidebar | Must |
| NAV-04 | Status footer in sidebar showing system health (entities monitored, active alerts, last analysis time) — entity label from Domain Pack | Must |
| NAV-05 | Single-page application — view switching without page reload | Must |

### A5.2 Design System

| ID | Requirement | Priority |
|----|-------------|----------|
| DS-01 | Consistent color system: primary accent, status colors (danger/warning/success), neutral palette | Must |
| DS-02 | Status indicators: colored dots, badges, trend arrows | Must |
| DS-03 | Card-based UI pattern with hover states and elevation | Must |
| DS-04 | Responsive layout supporting desktop and tablet | Must |
| DS-05 | Accessible typography with clear hierarchy | Must |
| DS-06 | Custom scrollbar styling | Should |
| DS-07 | Animations: pulse dots for active states, smooth transitions | Should |

### A5.3 Data & Integration

| ID | Requirement | Priority |
|----|-------------|----------|
| DATA-01 | All app types consume data from a unified data layer (not siloed) | Must |
| DATA-02 | Data layer is populated by MCP servers and Domain Pack connectors | Must |
| DATA-03 | Real-time data refresh capability | Should |
| DATA-04 | Offline-capable with cached data | Could |

---

## A6. App Type Composition Model

App types are designed to be **composed**, not just used in isolation. The Domain Pack's UI Configuration defines which compositions are active.

| Composition | Pattern |
|-------------|---------|
| Grid (table) + Chat | Entity table where row clicks open an AI conversation about that entity |
| Grid (cards) + Chat | Clicking a metric card opens an AI deep-dive on that metric |
| Alerts + Chat | Alert action button opens a discussion about the alert |
| Alerts + Simulator | Alert action button opens the relevant scenario |
| Simulator + Chat | Running a scenario opens a narrated analysis in Chat |
| Simulator + Grid | Scenario results displayed as a comparison table |

New experiences can be created by combining existing app types — no new UI required. The Domain Pack declares which compositions are wired up and what context is passed between them.

---

---

# PART B — USER ADMINISTRATION

Everything in Part B governs the multi-tenant operations layer: how tenants are provisioned, how users are managed, how permissions are enforced, and how content is shared. Part B is independent of any specific industry — it works the same regardless of which Domain Pack is active.

---

## B1. Multi-Tenant Architecture

The platform operates as a **multi-tenant system**. Each tenant is a fully isolated organization. Users, data, Domain Packs, roles, workspaces, and configurations are scoped to a tenant. No data crosses tenant boundaries unless explicitly federated.

### B1.1 Tenant Model

| ID | Requirement | Priority |
|----|-------------|----------|
| TNT-01 | Each tenant represents one organization with complete data isolation from other tenants | Must |
| TNT-02 | Tenant-scoped resources: users, roles, workspaces, Domain Packs, data connections, templates, shared content | Must |
| TNT-03 | Tenant provisioning — new tenants are created by platform super-admins with a name, billing plan, and initial admin user | Must |
| TNT-04 | Tenant-level configuration: custom branding (logo, accent color), default Domain Pack, default workspace template | Should |
| TNT-05 | Tenant suspension / deactivation without data loss (recoverable) | Must |
| TNT-06 | Tenant data export — full export of tenant data for portability or compliance | Should |

### B1.2 Tenant Data Isolation

| ID | Requirement | Priority |
|----|-------------|----------|
| TNT-07 | All data is tenant-scoped — queries, MCP connections, and LLM context never leak across tenant boundaries | Must |
| TNT-08 | Tenant-scoped encryption keys (or key partitioning) for data at rest | Should |
| TNT-09 | Audit logging is tenant-scoped — each tenant's audit trail is independent | Must |
| TNT-10 | MCP server connections are registered and credentialed per tenant — one tenant's data source configuration is invisible to others | Must |

---

## B2. User & Workspace Management

### B2.1 User Model

| ID | Requirement | Priority |
|----|-------------|----------|
| USR-01 | Users belong to exactly one tenant (no cross-tenant user accounts in v1) | Must |
| USR-02 | User authentication via tenant-configured identity provider (SSO/SAML, OAuth, email+password) | Must |
| USR-03 | User profile: name, email, avatar, role(s), status (active/suspended) | Must |
| USR-04 | User invitation flow — tenant admin invites users by email, user accepts and joins tenant | Must |
| USR-05 | User deactivation — removes access without deleting workspace data (recoverable) | Must |

### B2.2 Workspace Model

| ID | Requirement | Priority |
|----|-------------|----------|
| WS-01 | Each user has a personal workspace that persists across sessions | Must |
| WS-02 | Workspace contains: active app type instances, conversation history, saved scenarios, alert state, custom configurations | Must |
| WS-03 | Workspace is private by default — only the owner can see it | Must |
| WS-04 | Users can create multiple workspaces for different contexts | Should |
| WS-05 | Workspace layout and navigation are customizable by the user | Should |
| WS-06 | Workspaces are scoped to a tenant — a workspace's data access is bounded by the tenant's data connections and permissions | Must |

---

## B3. Roles & Permissions (RBAC)

The platform uses a three-tier role hierarchy: **Platform Super-Admin** (manages tenants), **Tenant Admin** (manages one organization), and **Workspace User** (operates within granted permissions).

### B3.1 Role Hierarchy

| Role | Scope | Responsibilities |
|------|-------|-----------------|
| **Platform Super-Admin** | Cross-tenant | Provision/suspend tenants, manage billing, curate global Domain Pack catalog, platform health monitoring |
| **Tenant Admin** | Single tenant | Manage users, assign roles, install/configure Domain Packs, manage data connections, set permissions, provision workspace templates, view tenant-level analytics |
| **Workspace User** | Single workspace (within tenant) | Use app types, create/customize workspaces, share content, activate permitted Domain Packs — all within the bounds set by the Tenant Admin |

### B3.2 Permission Dimensions

| ID | Requirement | Priority |
|----|-------------|----------|
| RBAC-01 | Tenant Admin defines custom roles with granular permission sets | Must |
| RBAC-02 | Permission dimensions: which app types are available, which data is visible, which Domain Packs can be activated, which actions are allowed (read-only vs. full), which sharing targets are permitted | Must |
| RBAC-03 | Role assignment — Tenant Admin assigns one or more roles to each user | Must |
| RBAC-04 | Default role — new users receive a tenant-configured default role on joining | Should |
| RBAC-05 | Permission inheritance — workspace-level permissions are the intersection of the user's role permissions and the tenant's global permissions | Must |
| RBAC-06 | Permission changes take effect immediately (no session restart required) | Should |

### B3.3 Admin Capabilities

| ID | Requirement | Priority |
|----|-------------|----------|
| ADM-01 | Tenant Admin dashboard: user management (invite, deactivate, role assignment) | Must |
| ADM-02 | Tenant Admin dashboard: Domain Pack management (install, configure, remove) | Must |
| ADM-03 | Tenant Admin dashboard: data connection management (MCP server credentials, connection health) | Must |
| ADM-04 | Tenant Admin dashboard: workspace template provisioning (pre-configured app types, Domain Packs, data connections assigned to new users) | Should |
| ADM-05 | Tenant Admin dashboard: usage analytics (active users, LLM token consumption, feature adoption) | Should |
| ADM-06 | Tenant Admin dashboard: audit log viewer (who did what, when) | Should |
| ADM-07 | Platform Super-Admin console: tenant provisioning, billing, global Domain Pack catalog management, platform health | Must |

---

## B4. User Freedom (Post-Login)

Within the bounds set by the Tenant Admin, users have autonomy over their workspace:

| ID | Requirement | Priority |
|----|-------------|----------|
| UF-01 | Users can freely create new app type instances within permission bounds | Must |
| UF-02 | Users can customize their sidebar navigation — reorder, rename, hide app types | Should |
| UF-03 | Users can adjust LLM behavior within their workspace (e.g., verbosity, focus areas) | Should |
| UF-04 | Users can activate available Domain Packs without admin intervention (if permitted by role) | Should |

---

## B5. Sharing

All app type outputs are shareable within tenant permission boundaries.

| ID | Requirement | Priority |
|----|-------------|----------|
| SHR-01 | Any app type output can be shared via link (read-only snapshot) | Must |
| SHR-02 | Chat conversations can be shared as a transcript | Must |
| SHR-03 | Alert analysis (expanded detail) can be shared as a standalone report | Must |
| SHR-04 | Grid views can be shared as a table/card snapshot or exported (CSV, PDF) | Must |
| SHR-05 | Scenario results (including variable settings and projections) can be shared | Must |
| SHR-06 | Shared links respect tenant and role permissions — recipients must have appropriate access within the same tenant | Must |
| SHR-07 | Share targets: direct link, email, messaging integration, embed in external tools — available targets governed by Tenant Admin | Should |
| SHR-08 | Version history on shared outputs — recipients see the latest or a pinned version | Should |
| SHR-09 | Cross-tenant sharing is disabled by default. If enabled by Platform Super-Admin, requires explicit opt-in by both Tenant Admins | Should |

---

## B6. Templates

Underlying configurations can be published as reusable templates, scoped to the tenant.

| ID | Requirement | Priority |
|----|-------------|----------|
| TPL-01 | Any configured app type instance can be saved as a template | Must |
| TPL-02 | Templates capture: app type, layout, column definitions, scenario variables, prompt suggestions, system prompt fragments | Must |
| TPL-03 | Templates are reusable — any user (with permission) can instantiate a new app type instance from a template | Must |
| TPL-04 | Tenant-level template library — Tenant Admins can curate and publish templates for their organization | Should |
| TPL-05 | Template categories and search for discoverability | Should |
| TPL-06 | Templates can be bundled into a Domain Pack for distribution | Should |
| TPL-07 | Platform-level template gallery — Platform Super-Admins curate cross-tenant templates (opt-in by tenants) | Could |

---

---

# PART C — DOMAIN PACK SPECIFICATION

Everything in Part C is what a **domain author** provides to activate the platform for a specific industry. Part C is a reference specification, illustrated with a concrete example derived from the prototype.

---

## C1. Domain Pack Manifest

A Domain Pack is delivered as a structured bundle containing the components defined in PLG-05 through PLG-10. Below is the manifest format:

```
domain-pack/
├── manifest.json          # Pack metadata (name, version, description, icon)
├── prompts/
│   └── system.md          # System prompt fragments (PLG-05)
├── skills/
│   └── *.json             # Skill definitions (PLG-06)
├── mcp/
│   └── servers.json       # MCP server declarations (PLG-07)
├── schemas/
│   └── *.json             # Data schemas for entities, metrics, relationships (PLG-08)
├── ui/
│   └── config.json        # UI configuration — app types, columns, cards, scenarios (PLG-09)
└── seed/
    └── *.json             # Sample data for onboarding (PLG-10)
```

### C1.1 Domain Pack Lifecycle

| Stage | Actor | Description |
|-------|-------|-------------|
| **Authoring** | Domain expert / solutions team | Creates the Domain Pack bundle following the contract in A4.2 |
| **Publishing** | Platform Super-Admin or Marketplace | Pack is made available in the global catalog (Part B, ADM-07) |
| **Installation** | Tenant Admin | Installs the pack into the tenant (Part B, ADM-02) |
| **Activation** | Tenant Admin or User (if permitted) | Activates the pack in a workspace (Part B, UF-04) |
| **Configuration** | Tenant Admin | Configures tenant-specific settings (MCP credentials, data source mappings) |
| **Updates** | Domain author | Publishes new versions; Tenant Admin controls upgrade rollout |

---

## C2. Reference Example — Executive Operations Domain Pack

This example shows how the prototype ("XYZ Home Services Executive Cockpit") would be packaged as a Domain Pack. The same structure applies to **any** industry — only the content changes.

### C2.1 System Prompt Fragments (`prompts/system.md`)

| Fragment | Content |
|----------|---------|
| Persona | "You are an executive decision-support agent for a multi-entity operating platform." |
| Vocabulary | Entity = Brand, Metric categories = Input / Conversion / Productivity / Output, Classification = Tier A / B / C |
| Analysis frameworks | Revenue funnel analysis, entity benchmarking, performance gap identification, scenario-based projection |
| Guardrails | Always quantify financial impact, cite confidence levels, recommend specific actions |

### C2.2 Skill Definitions (`skills/`)

| Skill Name | Description | Input | Output |
|------------|-------------|-------|--------|
| compare_entities | Compare N entities across metrics | Entity IDs, metric IDs | Ranked comparison with deltas |
| deep_dive_metric | Analyze a single metric with root causes | Metric ID, time range | Trend analysis, anomalies, drivers |
| run_scenario | Execute a what-if scenario with variables | Scenario ID, variable overrides | Projected outcomes, narrative |
| triage_alert | Analyze an alert and recommend actions | Alert ID | Root cause, recommendation, impact |

### C2.3 MCP Server Declarations (`mcp/servers.json`)

| Server | Purpose | Protocol |
|--------|---------|----------|
| ERP Connector | Revenue, margin, ticket size data | REST API |
| CRM Connector | Lead, conversion, membership data | REST API |
| Ops Platform | Dispatch, utilization, scheduling data | REST API |
| Call Analytics | Call volume, capture rate, abandonment | REST API |

### C2.4 Data Schemas (`schemas/`)

| Entity Type | Key Fields |
|-------------|------------|
| Organization | name, type, entity_count, geography_count, headcount, annual_revenue, service_lines |
| Entity (Brand) | name, region, tier, parent_org |
| Metric | id, label, value, unit, trend, target, status, category, icon |
| Alert | id, priority, confidence, title, detail, recommendation, impact, affected_entities |
| Scenario | id, title, description, baseline{}, projected{}, metadata{}, variables[] |

### C2.5 UI Configuration (`ui/config.json`)

| Config Area | Settings |
|-------------|----------|
| Entity Labels | singular: "brand", plural: "brands" |
| App Types enabled | Chat, Alerts, Grid (table), Grid (cards), Simulator |
| Sidebar labels | "AI Assistant", "Alerts", "KPIs", "Compare", "Simulator" |
| Chat quick actions | "What's the biggest risk today?", "Compare top vs bottom brands", "Run what-if on AI voice agents", "Show dispatch optimization plan" |
| Alert priorities | critical (red), high (amber), medium (blue) |
| Alert detail sections | Analysis, AI Recommendation, Impact |
| Alert actions | "Discuss with AI" → Chat, "Run Simulation" → Simulator |
| Grid (table) columns | Brand, Region, Tier, Rev/Tech/Wk, Call Capture, Membership, NPS, Jobs/Day |
| Grid (table) classification | Tier A (emerald), Tier B (blue), Tier C (red) |
| Grid (cards) sections | Input Metrics, Conversion Metrics, Productivity Metrics, Output Metrics |
| Grid (cards) status mapping | critical → red, warning → amber, good → emerald |
| Simulator scenarios | AI Voice Agents, Dynamic Dispatch, Playbook Replication, Membership Growth |
| Simulator metadata fields | Investment, ROI, Timeline, Confidence |
| Time periods | Day, Week (default), Month, Quarter |

### C2.6 Sample Data (`seed/`)

The prototype's hardcoded `COMPANY`, `METRICS`, `ALERTS`, `COMPARISONS`, and `SIMULATIONS` objects become seed data files that ship with this Domain Pack for demonstration and onboarding.

---

## C3. Multi-Industry Portability

To demonstrate that Parts A and B are truly industry-agnostic, here is how the Domain Pack contract maps to three different industries. **The platform code does not change — only the Domain Pack content.**

| Domain Pack Component | Home Services (prototype) | Healthcare System | Investment Portfolio |
|-----------------------|--------------------------|-------------------|---------------------|
| **Entity label** | Brand | Facility / Hospital | Portfolio Company |
| **System prompt persona** | Executive ops agent for multi-brand platform | Clinical operations advisor for health system | PE operating partner advisor |
| **Metric categories** | Input, Conversion, Productivity, Output | Access, Quality, Efficiency, Financial | Revenue, Margin, Growth, Valuation |
| **Example metrics** | Call Capture Rate, Rev/Tech, NPS | Bed Occupancy, Readmission Rate, Patient Satisfaction | Revenue Growth, EBITDA Margin, Cash Conversion |
| **Classification scheme** | Tier A / B / C | Performance Quartile 1-4 | Green / Yellow / Red |
| **Alert examples** | Call abandonment spike, utilization gap | Readmission rate exceeding threshold, staffing shortage | Revenue miss, covenant breach risk |
| **Scenario examples** | AI voice agents, dispatch optimization | Telehealth expansion, OR scheduling optimization | Add-on acquisition, pricing restructure |
| **Scenario metadata fields** | Investment, ROI, Timeline | Cost, Quality Impact, Timeline | Investment, IRR, Hold Period |
| **MCP servers** | ERP, CRM, dispatch, call analytics | EMR, scheduling, claims, quality reporting | ERP, CRM, cap table, market data |
| **Grid columns** | Brand, Region, Rev/Tech, NPS… | Facility, Region, Bed Util, Readmit Rate… | Company, Sector, Revenue, EBITDA… |
| **Quick actions** | "Compare top vs bottom brands" | "Show facilities exceeding readmission threshold" | "Which portfolio companies are underperforming?" |

---

## C4. Prototype-to-Platform Mapping

How each element of the current prototype (`index.html`) maps to the three-part architecture:

| Prototype Element | Part A (Core Platform) | Part B (Administration) | Part C (Domain Pack) |
|-------------------|----------------------|------------------------|---------------------|
| `sendMessage()` with regex matching | **LLM Core** (A3) — real Claude inference | — | **Skills** (C2.2) — domain-specific capabilities |
| `COMPANY` object | **Data Layer** (A5.3) — unified entity store | **Tenant data isolation** (B1.2) — scoped to tenant | **Schema** (C2.4) — Organization entity type |
| `METRICS` object | **Grid Builder card variant** (A2.3) | — | **Schema** (C2.4) — Metric entity; **UI Config** (C2.5) — section groupings |
| `ALERTS` array | **Alerts app type** (A2.2) | — | **Schema** (C2.4) — Alert entity; **UI Config** (C2.5) — priority levels, detail sections |
| `COMPARISONS` array | **Grid Builder table variant** (A2.3) | — | **Schema** (C2.4) — Entity type; **UI Config** (C2.5) — column definitions, tier scheme |
| `SIMULATIONS` array | **Simulator app type** (A2.4) | — | **Schema** (C2.4) — Scenario entity; **UI Config** (C2.5) — scenario templates, metadata fields |
| Hardcoded quick-action labels | **Chat** (A2.1, CHAT-04) — renders buttons | — | **UI Config** (C2.5) — provides the button labels and prompts |
| Fixed 5-view sidebar | **Navigation** (A5.1, NAV-01) — renders sidebar | — | **UI Config** (C2.5) — declares which app types are active, labels, and icons |
| `"$1.2B ARR"` in header | **Header** (A5.1, NAV-02) — renders status indicators | — | **Data Layer** — organization revenue from MCP server |
| No auth, single-user | — | **Full RBAC** (B3) — multi-user, multi-role, tenant-scoped | — |
| No sharing | — | **Sharing** (B5) — link sharing, export, tenant-scoped permissions | — |
| Inline Tailwind/React | **Design System** (A5.2) — component library | — | N/A — visual system is core, not domain |

---

*Part A is the product engine. Part B is the operations layer. Part C is the industry content. The boundaries are: Part A never references a domain. Part B never references a domain. Part C never assumes platform internals — it only fills the contract defined in A4.*
