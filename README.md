# ⛏️ CoalDrishti AI — Autonomous Mine Governance & Statutory Safety Command Platform

<div align="center">

[![Live API](https://img.shields.io/badge/Render-API%20Live-00C896?style=for-the-badge&logo=render&logoColor=white)](https://coaldrishti-api.onrender.com/docs)
[![Live Frontend](https://img.shields.io/badge/Vercel-Web%20Command%20Center-black?style=for-the-badge&logo=vercel&logoColor=white)](https://coaldrishti.vercel.app)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary%20All%20Rights%20Reserved-red?style=for-the-badge&logo=shield)](./LICENSE)
[![DGMS Statutory](https://img.shields.io/badge/Compliance-CMR%202017%20%7C%20Mines%20Act%201952-0B8F72?style=for-the-badge&logo=gov.uk)](https://dgms.gov.in/)

<br />

[![Python 3.11+](https://img.shields.io/badge/Python-3.11+-blue.svg?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111.1-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black.svg?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas%20%7C%20Beanie%20ODM-47A248.svg?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-Command%20Center%20Dark-38B2AC.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-IsolationForest%20AI-F7931E.svg?logo=scikitlearn&logoColor=white)](https://scikit-learn.org/)
[![SHA-256 Ledger](https://img.shields.io/badge/Audit-SHA--256%20Merkle%20Chain-4F9CFF.svg?logo=blockchaindotcom&logoColor=white)]()
[![Dexie.js Offline](https://img.shields.io/badge/Offline--First-IndexedDB%20v5-FF6B6B.svg)](https://dexie.org/)

<br />

**An enterprise-grade, offline-first digital intelligence platform for statutory mine safety, multi-tier compliance surveillance, forward-looking 72-hour AI hazard forecasting, and tamper-evident cryptographic audit transparency across Indian coal mines.**

*Engineered for the Directorate General of Mines Safety (DGMS), Ministry of Coal (MOC), Coal India Limited (CIL), and Singareni Collieries Company Limited (SCCL).*

</div>

---

> [!IMPORTANT]
> ### ⛔ PROPRIETARY SOFTWARE NOTICE
> **Copyright &copy; 2026 CoalDrishti AI & Vishesh Shah. All Rights Reserved.**  
> This software and associated documentation contain proprietary algorithms, trade secrets, and copyrighted architectural assets.  
> **Strictly Prohibited:** Unauthorized copying, modification, redistribution, public cloning for competition/commercial deployment, sublicensing, or reverse-engineering of this repository in whole or in part without express written permission. Refer to the formal [LICENSE](./LICENSE) for legal terms.

---

## 📌 Executive Architecture & Data Flow

CoalDrishti AI bridges physical underground extraction galleries and high-level government governance through an integrated, multi-tier command architecture:

```mermaid
flowchart TD
    subgraph PITS["⛏️ PHYSICAL EXTRACTION GALLERIES"]
        S1["Longwall Face and Returns"]
        S2["Incline Gallery 11A"]
        S3["Opencast Benches"]
    end

    subgraph EDGE["📶 EDGE SENSORS AND MUSTER"]
        E1["IoT Gas and Velocity Telemetry<br/>(CH4, CO, O2, Airflow)"]
        E2["Biometric RFID Muster<br/>(Shift and Gas Exposure)"]
        E3["Dumper Weights and Blasting"]
    end

    subgraph OFFLINE["📱 OFFLINE-FIRST PWA ENGINE"]
        O1["Dexie.js v5 IndexedDB Cache"]
        O2["Auto-Reconciliation Mutex on Reconnect"]
    end

    subgraph CLOUD["☁️ REGULATORY CLOUD GATEWAY (FastAPI)"]
        C1["PostGIS Leasehold Geofence Engine"]
        C2["DGMS and CMR 2017 Statutory Rule Engine"]
        C3["IsolationForest 72h Predictive AI"]
        C4["SHA-256 Tamper-Evident Merkle Ledger"]
    end

    subgraph STORE["🗄️ SOVEREIGN DATA STORES"]
        D1[("MongoDB Atlas")]
        D2[("Redis Queue")]
        D3[("Immutable Ledger")]
    end

    subgraph USERS["🖥️ COMMAND CENTER PERSONAS"]
        U1["🏛️ Ministry Auditor<br/>(National Macro Risk)"]
        U2["⚖️ DGMS Inspector<br/>(Enforcement and Form-IV)"]
        U3["🏭 Colliery Manager<br/>(Mine Cockpit and Logs)"]
        U4["👷 Mining Sirdar<br/>(Field Hazard Halts)"]
    end

    S1 --> E1
    S2 --> E2
    S3 --> E3

    E1 & E2 & E3 --> CLOUD
    OFFLINE <--> CLOUD

    CLOUD --> STORE
    STORE --> USERS
```

---

## 🌟 Core Technical Capabilities

### 1. 🛡️ Cryptographic SHA-256 Audit Ledger & Tamper Interception
* **Canonical Block Chaining**: Every statutory record (gas telemetry, worker muster, inspection report, or corrective action) is committed as an immutable block:
  $$H_n = \text{SHA256}(H_{n-1} \parallel \text{Seq} \parallel \text{Actor} \parallel \text{CanonicalPayload})$$
* **Repository-Level Tamper Interception**: Any retrospective modification attempt on committed records is intercepted, blocked with `HTTP 403 Forbidden`, and committed as an emergency tampering breach block.
* **Web Audio Forensic Siren**: An integrated HTML5 Web Audio synthesizer generates dual-tone emergency alerts (800Hz–1200Hz) upon ledger divergence without external audio dependencies.
* **Interactive Attack Simulator**: Dedicated `/audit-ledger` console equipped with live mutation simulation (`POST /api/v1/audit-ledger/simulate-tamper`) for regulatory verification.

### 2. 🔮 72-Hour Predictive AI Safety & Hazard Forecaster (`/analytics`)
* **Forward Sequence Projections**: Projects sensor trajectories across $t+24\text{h}$, $t+48\text{h}$, and $t+72\text{h}$ using kinematic telemetry acceleration:
  $$\hat{y}(t) = y_0 + v_0 t + \frac{1}{2} a t^2$$
* **Dual-Line CI Visualizer**: Visualizes historical telemetry transitioning into predictive forecasts accompanied by shaded 95% Confidence Interval bands:
  $$\text{CI}_{95\%} = \hat{y}(t) \pm 1.96 \cdot \text{SE} \cdot \sqrt{\frac{t}{24}}$$
* **CMR 2017 Early-Warning Tripwires**: Flags methane buildup ($\text{CH}_4 \ge 0.75\%$) and spontaneous heating ($\frac{d\text{CO}}{dt} \ge 3\text{ ppm/hr}$) hours before physical thresholds are breached.

### 3. 🤖 Unsupervised ML Anomaly Detection (`IsolationForest`)
* **Multi-Variate Safety Envelopes**: Evaluates multi-dimensional feature spaces $[\text{CH}_4, \text{CO}, \frac{d\text{CO}}{dt}, \text{AirVelocity}, \text{OvertimeHours}]$ to detect complex micro-anomalies that evade static threshold checks.
* **Rubber-Stamping / Flatline Fraud Detector**: Identifies fabricated shift submissions where variance across consecutive entries collapses to zero ($\sigma^2 \approx 0$), raising automatic audit investigations.

### 4. 📱 Multi-Recipient Emergency SMS Alert Dispatch
* **Real-Time Telecom Dispatch**: Dispatches automated emergency SMS broadcasts to Ministry Auditors, DGMS Inspectors, and Colliery Managers for:
  - Unauthorized ledger tampering breaches
  - Immediate worker underground hazard stops
  - Predicted spontaneous combustion occurrences
* **Dual Provider Architecture**: Integrates Fast2SMS (Indian domestic routes) and Twilio (international E.164) with resilient diagnostic fallbacks.

### 5. 🗺️ High-Resolution Geospatial Command Center (`/map`)
* **Dynamic Location-Reactive Hydration**: Selecting any mine site triggers TanStack Query invalidation, smoothly repositioning the camera (`flyTo`) and streaming mine-specific telemetry.
* **PostGIS Boundary Verification**: Overlays DGMS leasehold polygons, environmental safety buffer zones, and underground RFID beacon stations on dark-mode satellite imagery.
* **Surface HEMM Fleet Tracking**: Real-time GPS surveillance of haul trucks, dumpers, and excavators with automated speed-violation geofences.

### 6. 📊 Colliery Shift Data Logs Register (`/data-logs`)
* **Tab 1 — Atmospheric Telemetry**: Continuous stream of $\text{CH}_4, \text{CO}, \text{O}_2$, air velocity, and temperature with SHA-256 fingerprints and statutory compliance badges.
* **Tab 2 — Biometric Worker Muster**: Shift check-in timestamps, underground gallery deployments, accumulated toxic gas exposures, and statutory overtime warnings ($>8\text{h}$).
* **Tab 3 — Mine Extraction Register**: Opencast bench excavation tonnage, daily quota achievements, dumper trips, and ANFO explosive blasting clearances.

### 7. ⚖️ Closed-Loop 6-Stage CAPA Kanban Board (`/capa`)
* **Statutory Remediation Workflow**: Complete enforcement lifecycle:
  $$\text{NEW} \longrightarrow \text{UNDER REVIEW} \longrightarrow \text{ACTION ASSIGNED} \longrightarrow \text{IN PROGRESS} \longrightarrow \text{VERIFICATION} \longrightarrow \text{CLOSED}$$
* **Violation Metadata**: Associates notices with specific regulations (CMR Reg 108, CPCB Water Act), assignees, evidence uploads, and strict remediation deadlines.

### 8. 👷 Worker Welfare & Chapter VII Leave Management
* **Urgent Hazard Reporting**: Allows shift miners to report ventilation, roof support, or mechanical hazards. Emergency stops instantly notify the Colliery Manager and Shift Sirdar.
* **Mines Rules 1955 Leave Portal**: Full tracking of `CASUAL`, `SICK_MEDICAL`, `EARNED_STATUTORY`, and `ACCIDENT_COMPENSATORY` leaves with balance tracking and manager sign-offs.

### 9. 📑 Form B & Form E Statutory Muster Spreadsheet Generator (`/attendance`)
* **Native Excel Export**: Generates authentic **DGMS Form B & Form E Coal Mines Attendance Registers** via `openpyxl` with shift filtering and toxic exposure flags.

### 10. 📶 Universal Offline-First Architecture (Dexie.js v5)
* **Underground Gallery Cache**: Full IndexedDB offline persistence for field inspections, hazard reports, and shift actions when working below ground.
* **Auto-Reconciliation Engine**: Background listener detects network recovery, acquiring client mutexes to flush offline queues with zero duplication using UUID idempotency keys.

---

## 🧠 Explainable CMR 2017 AI Safety Risk Engine

Mine safety scores are computed via an explainable, multi-pillar statutory formula:

$$S_{\text{risk}} = \min\left(100, \; w_g \cdot G + w_c \cdot C + w_m \cdot M + w_e \cdot E + P_{\text{stale}}\right)$$

| Pillar | Weight | Monitored Parameters | Statutory Reference |
| :--- | :---: | :--- | :--- |
| **$G$ — Gas & Atmosphere** | **35%** | $\text{CH}_4$ (Methane %), $\text{CO}$ (PPM), $\frac{d\text{CO}}{dt}$ rate of rise, $\text{O}_2$ deficiency | CMR 2017 Reg 153 |
| **$C$ — CAPA Violations** | **25%** | Unrectified statutory violation notices, severity weights, overdue rectifications | CMR 2017 Statutory Orders |
| **$M$ — Mine Depth & Seam** | **20%** | Incline depth (meters), Gassy Seam Degree (Degree I, II, or III) | DGMS Circulars |
| **$E$ — Equipment & Slope** | **20%** | Overdue HEMM maintenance, Opencast Bench Factor of Safety ($\text{FoS}$), 24h rainfall (mm) | CMR 2017 Reg 130 |
| **$P_{\text{stale}}$ — Data Staleness** | **0–15 pt** | Penalty applied when sensor telemetry or shift logs exceed 2, 6, 12, or 24 hours | Data Governance Standard |

---

## 🏢 Commercial & Statutory Deployment Plans

| Plan | Target Organization | Scale | Key Inclusions |
| :--- | :--- | :--- | :--- |
| **Single Colliery Pilot** | Single Incline / OCP | 1 Mine Site | Real-time gas telemetry, automated Form-IV generation, worker biometric muster, offline IndexedDB sync, 30-day SHA-256 audit ledger. |
| **Area Command Hub** *(Featured)* | CIL / SCCL Mining Area | Up to 15 Mines | **72-Hour Predictive Risk Engine (IsolationForest)**, PostGIS leasehold geofencing, closed-loop CAPA kanban, automated emergency SMS alerts, continuous Merkle chain verification. |
| **Apex Ministry Enterprise** | Ministry of Coal & DGMS HQ | Pan-India | Sovereign SHA-256 Merkle chain with national state anchoring, subsidiary compliance heatmaps, real-time sync across 348+ leases, on-premise air-gapped Gov-Cloud deployment. |

---

## 🛠️ Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Architecture** | Next.js 14.2 (App Router), TypeScript 5.0, Tailwind CSS, TanStack React Query v5, Lucide Icons, Leaflet 1.9, Dexie.js v5 |
| **Backend & Distributed Systems** | FastAPI 0.111 (Python 3.11), Motor & Beanie ODM (MongoDB 7.0+), Celery 5.4 & Redis 5.0, Scikit-Learn 1.4, OpenPyXL 3.1, ReportLab 5.0 |
| **Security & Cryptography** | Canonical SHA-256 Hash Chaining, HS256 JWT Authentication, Bcrypt Password Hashing, HTML5 Web Audio Synthesizer |
| **Telecom & Gateways** | Fast2SMS (Indian National Routes), Twilio (E.164 Global SMS) |

---

## 🚀 Live Production & Deployment Guide

### 1. Cloud URLs
* **Frontend Web Application**: [https://coaldrishti.vercel.app](https://coaldrishti.vercel.app)
* **Backend API Swagger**: [https://coaldrishti-api.onrender.com/docs](https://coaldrishti-api.onrender.com/docs)
* **Backend Health Check**: [https://coaldrishti-api.onrender.com/health](https://coaldrishti-api.onrender.com/health)

### 2. Backend Deployment on Render
1. Create a new **Web Service** connected to your repository.
2. Configure settings:
   - **Runtime**: `Python 3` (Version `3.11.9`)
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
3. Environment Variables:
```env
APP_ENV=production
APP_SECRET_KEY=your_32_character_secret_key
APP_DEBUG=false
MONGODB_URL=mongodb+srv://admin:<password>@cluster0.xxxx.mongodb.net/coal_governance?retryWrites=true&w=majority
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=60
```

### 3. Frontend Deployment on Vercel
1. Import repository on Vercel.
2. Set **Root Directory** to `frontend`.
3. Set Environment Variables:
```env
NEXT_PUBLIC_API_URL=https://coaldrishti-api.onrender.com/api/v1
NEXT_PUBLIC_DEMO_MODE=true
```
4. Click **Deploy**.

---

## 💻 Local Development Setup

### Prerequisites
* **Python 3.11+**
* **Node.js 18+ & npm**
* **MongoDB 7.0+** (or free MongoDB Atlas cluster)

### 1. Backend Setup
```bash
# Clone the repository
git clone https://github.com/vishesh-017/coaldrishti-ai.git
cd coaldrishti-ai

# Create and activate virtual environment
python -m venv .venv
# Windows:
.\.venv\Scripts\activate
# Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend server
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
Swagger UI will be available at: `http://127.0.0.1:8000/docs`

### 2. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start Next.js development server
npm run dev -- -p 3001
```
Web command center will be available at: `http://localhost:3001`

---

## 🔐 Role-Based Access Control (RBAC) Matrix

| Persona | Primary Scope | Accessible Workspaces |
| :--- | :--- | :--- |
| **Ministry Auditor** | Pan-India Macro Oversight | Executive Overview, Subsidiary Heatmap, Form-IV Dossiers, National Risk Analytics |
| **DGMS Inspector** | Statutory Enforcement | Official Inspections, CAPA Notices, Violation Matrix, Emergency Dispatch |
| **Colliery Manager** | Colliery Operations | Atmospheric Logs, Worker Muster, Blasting Casts, Risk Gauge, Shift Leave Approvals |
| **Mining Sirdar / Worker** | Field & Pit Safety | Shift Telemetry, Hazard Emergency Stop, Biometric Check-in, Statutory Leave Portal |

---

## ⚖️ Legal & Intellectual Property Agreement

```text
PROPRIETARY SOFTWARE — ALL RIGHTS RESERVED
Copyright (c) 2026 CoalDrishti AI & Vishesh Shah.

This codebase and architecture are protected by applicable intellectual property
and copyright legislation. Reproduction, public distribution, commercial deployment,
or use of this platform without prior written authorization is strictly prohibited.
```
For licensing, sovereign deployments, or partnership inquiries:  
**Contact:** `vishesh-017` / Vishesh Shah (24bce311@gmail.com)
