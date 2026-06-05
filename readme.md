Split Expense App
=================

This is a simple split expense app built using React. It allows users to add expenses, split them among friends, and keep track of who owes what.

To get started, 
1. clone the repository
2. `cd splitexpense`
3. `cd backend && npm install`
4. `cd ../frontend && npm install`

To run the app,
- Frontend: `cd frontend && npm run dev`
- Backend: `cd backend && npm start`

To build skeletons:
1. Install `npx playwright install chromium` and `npm install boneyard-js` in `/frontend`
2. Wrap the components with the 
```javascript
import { Skeleton } from 'boneyard-js/react'
<Skeleton name="profile-image" loading={false}></Skeleton>
```
    - `false` in build phase.
3. Build using `npx boneyard-js build [url]`
4. Import `import './bones/registry'` in `main.jsx` after the skeletons are build.
5. Change the loading states.