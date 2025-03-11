# Intergalactic Planetary Index
## Ledn Frontend Challenge
---
## Flexible requirements chosen:
1. "Implement a solution capable of turning all transactions with a status of `inProgress` for a given planet to `blocked` using a planet ID."
2. "Add additional controls to filter the planets by terrain and climate."

### How to run this project
1. Clone the project repository into your local environment using `git clone git@github.com:matheusmurden/ledn-frontend-challenge.git`
2. Navigate into the `ledn-frontend-challenge` folder now located on your local environment
3. Install the dependencies with `npm install`
4. Start the application with `npm run start`
5. Open [http://localhost:3000](http://localhost:3000) to test the app

### Basic steps to test the app
1. Opening the application you should be redirected to `/planets` route
2. All planets should now have loaded into the page, they are displayed as cards and are clickable
3. Use the search section located at the top to filter planets by name, climate and/or terrain
4. You will also see a pill-shaped component on the top-right always displaying the updated `ICS` to `GCS` exchange rate
5. By clicking any planet card you'll navigate into `/planets/:planetId` route, this displays the planet details
6. On the planet details page, you can view all transactions from that planet's users with a live-updated exchange value in `GCS` and `ICS`
7. You can click on the radio buttons to filter the transactions by currency type
8. At the top you'll see details about the planet and also the total amount transacted in `GCS` and `ICS` separately
9. There's a big red button on the bottom-left, by clicking it you can `block all transactions with status "In Progress"` for a given planet
