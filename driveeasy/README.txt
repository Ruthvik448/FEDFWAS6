DriveEasy Car Rental System — V8 customer + admin update

1. Open DriveEasy_Project/index.html with Live Server or any local web server.
2. Customer flow: Register/Login -> Dashboard -> Search -> Review & Pay -> Booking appears in My Bookings.
3. Admin login: admin@driveeasy.in / Admin@123. Admin Console is intentionally hidden from normal customers.
4. Booking data, user data and vehicle data are stored in browser localStorage for this HTML/CSS/JS demo.
5. Search uses From + To; the Distance field was removed. The system estimates kilometres automatically and shows the estimate again near payment.
6. Pricing = daily car rate x days + per-km rate x estimated kilometres + driver daily fee x days when Driver Required is selected.
7. The bill explicitly shows Without Driver and With Driver totals.
8. Admin dashboard shows booking counts, booked vehicles, revenue, customers and a vehicle-condition pie chart.
9. Vehicle conditions: Excellent, Good, Service Due, Needs Attention.
10. Customer-first additions include booking IDs, route visibility, clear fare breakdown, cancellation controls, pickup/return inspection guidance and route estimate visibility.
11. Real car photos are resolved at runtime from Wikimedia Commons using the exact company + model query, with a local placeholder fallback. An internet connection is needed for remote photos.
12. For production use, move authentication, payments and booking records to a secure backend/database; do not store passwords in localStorage.
