# Intergalactic Planetary Index
## Ledn Frontend Challenge
---
#### Desktop
[![Video](https://github.com/user-attachments/assets/ad5766de-a6e0-4811-a338-49cbd30f7b37)](https://github.com/user-attachments/assets/4e6ea710-8e55-4c7d-9831-263d65aef158)

<img width="1512" alt="Screenshot 2025-03-11 at 16 40 53" src="https://github.com/user-attachments/assets/9a50d7df-e4fd-481e-9681-b0bba27590f1" />
<img width="1511" alt="Screenshot 2025-03-11 at 16 41 25" src="https://github.com/user-attachments/assets/c78b4779-f3be-4ecb-9de2-18105b226f78" />
<img width="1512" alt="Screenshot 2025-03-11 at 16 41 38" src="https://github.com/user-attachments/assets/4756bd52-68d9-4672-a7e3-bf83353cdfd9" />
---

#### Phone
<img width="871" alt="Screenshot 2025-03-11 at 16 46 54" src="https://github.com/user-attachments/assets/5315bd61-274c-4a83-99e6-d871fc808b23" />
---

#### Tablet
<img width="887" alt="Screenshot 2025-03-11 at 16 47 21" src="https://github.com/user-attachments/assets/0a40bb7a-ca16-449d-b1c6-d48e61dd87af" />
<img width="837" alt="Screenshot 2025-03-11 at 16 47 35" src="https://github.com/user-attachments/assets/2057e9a6-ccac-47dc-9c95-604561ea76fe" />
<img width="895" alt="Screenshot 2025-03-11 at 16 47 40" src="https://github.com/user-attachments/assets/cbf75436-7849-4315-b666-38e7bd954d4b" />

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
