# 📊 Madhav Ecommerce Sales Dashboard

An interactive Power BI sales analytics dashboard that transforms raw ecommerce data into actionable business insights.

![Dashboard Preview](https://img.shields.io/badge/Power%20BI-Dashboard-yellow?style=for-the-badge&logo=powerbi)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## 📈 Project Overview

This comprehensive sales dashboard provides real-time insights into ecommerce performance across multiple dimensions including product categories, geographic regions, customer segments, and temporal trends.

### Key Metrics

| Metric | Value |
|--------|-------|
| **Total Sales** | ₹2.17M |
| **Net Profit** | ₹37K |
| **Average Order Value** | ₹121K |
| **Total Amount** | ₹438K |

---

## ✨ Key Features

### 📊 Multi-Dimensional Analysis
- Product category performance tracking (Clothing, Electronics, Furniture)
- Geographic sales distribution across major Indian cities
- Customer segmentation and order analysis
- Temporal trend visualization with quarterly filters

### 💰 Financial Insights
- Profit vs Loss order tracking (64.73% profitable orders)
- Monthly profitability trends throughout the year
- Sub-category margin analysis (Printers, Bookcases, Sarees, Accessories, Tables)
- Payment mode distribution (COD, UPI, Credit/Debit Card, EMI)

### 🎯 Interactive Controls
- Quarterly filters (Q1, Q2, Q3, Q4) for time-based analysis
- State-wise performance drill-down
- Dynamic visualizations with cross-filtering
- Real-time data refresh capabilities

---

## 💡 Business Insights

### Product Performance
- **Clothing** dominates at **62.62%** of total sales
- **Electronics** contributes **20.55%**
- **Furniture** accounts for **16.83%**
- **Printers** lead in profitability among sub-categories

### Payment Preferences
- **COD**: 44% (most preferred)
- **UPI**: 21%
- **Debit Card**: 13%
- **Credit Card**: 12%
- **EMI**: 10%

### Geographic Distribution
Top performing cities:
1. **Indore** - 71 orders
2. **Mumbai** - 67 orders
3. **Chandigarh** - 30 orders
4. **Pune** - 27 orders
5. **Delhi** - 24 orders

### Order Quality Metrics
- **Profitable Orders**: 64.73%
- **Loss Orders**: 35.27%
- Peak profitability observed in **December**
- Strong performance in Q1 (January-March) and Q4 (December)

---

## 🔧 Technical Implementation

### Data Processing
- ETL pipeline for data transformation and cleansing
- Data modeling with proper relationships and hierarchies
- Calculated columns and measures using DAX
- Data quality validation and error handling

### DAX Formulas Used
```dax
Profit = SUM(Sales[Amount]) - SUM(Sales[Cost])
AOV = DIVIDE(SUM(Sales[Amount]), COUNTROWS(Sales))
Profit % = DIVIDE([Profit], SUM(Sales[Amount]))
```

### Visualization Components
- **Donut Charts** for composition analysis (Categories, Payment Mode, P&L)
- **Bar Charts** for geographic and customer comparisons
- **Stacked Bar Charts** for monthly profit trends
- **KPI Cards** for key metrics display
- **Custom Color Scheme** with purple/blue palette for modern aesthetics

---

## 🎯 Business Use Cases

### For Sales Managers
- Track quarterly performance against targets
- Identify top-performing customers and regions
- Optimize sales strategies based on data insights

### For Inventory Teams
- Understand product category demand patterns
- Manage stock levels efficiently by location
- Forecast inventory needs based on historical trends

### For Finance Teams
- Monitor profitability trends and margins
- Analyze loss-making orders for optimization
- Track payment method preferences for cash flow planning

### For Marketing Teams
- Identify high-value customer segments
- Target geographic regions with growth potential
- Plan seasonal campaigns based on monthly trends

---

## 🛠️ Technologies Used

- **Power BI Desktop** - Dashboard development
- **DAX** - Data Analysis Expressions for calculations
- **Power Query** - Data transformation and ETL
- **Excel/CSV** - Source data format

---

## 📁 Project Structure

```
madhav-ecommerce-dashboard/
│
├── data/
│   ├── sales_data.csv
│   └── data_dictionary.md
│
├── dashboard/
│   └── Madhav_Ecommerce_Dashboard.pbix
│
├── screenshots/
│   ├── dashboard_overview.png
│   └── data_view.png
│
└── README.md
```

---

## 📊 Dashboard Sections

1. **KPI Overview** - Key metrics at a glance
2. **Category Analysis** - Product category performance breakdown
3. **Geographic Distribution** - City and state-wise sales
4. **Customer Insights** - Top customers by order count
5. **Profitability Analysis** - Profit vs Loss distribution
6. **Payment Trends** - Payment method preferences
7. **Temporal Analysis** - Monthly profit trends with seasonal patterns

---

## 🎓 Learning Outcomes

This project demonstrates proficiency in:
- Data visualization best practices
- Business intelligence dashboard design
- DAX formula creation and optimization
- Interactive report development
- Data storytelling and insight generation

---

## 📝 Future Enhancements

- [ ] Add predictive analytics for sales forecasting
- [ ] Implement customer lifetime value (CLV) calculations
- [ ] Create mobile-responsive dashboard views
- [ ] Add drill-through pages for detailed analysis
- [ ] Integrate real-time data refresh
- [ ] Develop automated email reports

---

## ⭐ Acknowledgments

- Data source: Madhav Ecommerce sample dataset
- Inspiration: Real-world ecommerce analytics requirements
- Tools: Microsoft Power BI community resources

---
## Glance of Dashboard
<img width="1515" height="800" alt="image" src="https://github.com/user-attachments/assets/cafb8bb2-3432-48ae-b66f-0568302e06f9" />


<p align="center">Made with ❤️ and Power BI</p>
<p align="center">⭐ Star this repo if you find it helpful!</p>
