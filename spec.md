# Dev Portfolio

## Current State
- Full portfolio site for Kundan Patel with sections: Hero, About, Skills, Projects, Experience, Certifications, Contact, Footer
- Backend (main.mo) stores ContactMessage with admin CRUD; uses Internet Identity + one-time admin token for auth (via authorization component)
- All portfolio content (projects, skills, certifications, experience) is hardcoded in src/data/portfolio.ts
- Admin panel (AdminPanel.tsx) shows only contact messages; login requires Internet Identity + admin token claim
- Frontend hooks (useQueries.ts) call backend via actor; no dynamic portfolio data fetched from backend

## Requested Changes (Diff)

### Add
- Backend: `AdminCredentials` type with username + hashed password; `setupAdmin(username, password)` (one-time only); `adminLogin(username, password): bool`; `isAdminSetup(): bool`
- Backend: Dynamic data types `Project`, `Skill`, `Certification`, `Experience` with Nat IDs
- Backend: CRUD endpoints for each type (add, update, delete, getAll) — admin-only for mutations, public for reads
- Backend: `seedPortfolioData()` — one-time seed with Kundan's existing data
- Frontend: `useAdminLogin`, `useAdminSetup`, `useIsAdminSetup` hooks
- Frontend: `useProjects`, `useSkills`, `useCertifications`, `useExperiences` query hooks
- Frontend: `useAddProject`, `useAddSkill`, `useAddCertification`, `useAddExperience` mutation hooks
- Frontend: `useDeleteProject`, `useDeleteSkill`, `useDeleteCertification`, `useDeleteExperience` mutation hooks
- AdminPanel: username/password login form (no Internet Identity), first-time setup form, tabs: Messages | Projects | Skills | Experience | Certifications, add-form modals for each content type
- Loading skeletons in all portfolio sections while data loads

### Modify
- `main.mo` — replace principal-based auth with username/password auth; add dynamic content models and CRUD; keep ContactMessage CRUD unchanged
- `backend.d.ts` — add all new types and endpoint signatures
- `AdminPanel.tsx` — replace Internet Identity login with username/password form; add content management tabs
- `ProjectsSection.tsx` — fetch from backend instead of static data
- `SkillsSection.tsx` — fetch from backend instead of static data
- `ExperienceSection.tsx` — fetch from backend instead of static data
- `CertificationsSection.tsx` — fetch from backend instead of static data
- `useQueries.ts` — add new hooks for portfolio data and admin auth
- `ProjectDetail.tsx` — fetch project by id from backend

### Remove
- Internet Identity / Caffeine admin token login flow from AdminPanel.tsx
- `useInternetIdentity` hook usage in AdminPanel
- `useClaimAdmin` hook (replaced by `useAdminLogin`)
- Static data imports from portfolio.ts in section components (data stays in portfolio.ts as seed reference only)

## Implementation Plan
1. Rewrite main.mo: username/password admin auth (setup once, stored as hashed text), dynamic CRUD for Project/Skill/Certification/Experience, keep ContactMessage CRUD, add seedPortfolioData endpoint
2. Update backend.d.ts with all new types and method signatures
3. Update useQueries.ts with new hooks for admin auth and portfolio data CRUD
4. Rewrite AdminPanel.tsx: simple username/password form, first-time setup flow, tabbed dashboard (Messages, Projects, Skills, Experience, Certifications), add/delete modals for each type
5. Update ProjectsSection, SkillsSection, ExperienceSection, CertificationsSection to fetch from backend with loading states
6. Update ProjectDetail.tsx to fetch project from backend by id
