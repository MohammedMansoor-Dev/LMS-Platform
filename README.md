# LMS Platform - README

## Overview

This LMS (Learning Management System) platform enables instructors to create and sell courses, while students can purchase and track their learning progress. Instructors can build courses, add lectures, and have full control over content, while students can buy courses and access them for a lifetime. The platform also provides features like tracking course completion, marking lectures as completed or incomplete, and integrates Stripe for secure payments.

## Features

### For Instructors:
1. **Create and Manage Courses**  
   - Instructors can create courses, provide descriptions, and organize content.
   
2. **Add and Manage Lectures**  
   - Instructors can add lectures in multiple formats (video, text, quizzes, etc.).
   
3. **Set Course Pricing**  
   - Instructors can set the price for each course they create and sell on the platform.

4. **Course Analytics**  
   - View course performance, student enrollments, and sales data.

5. **Authentication & Authorization**  
   - Instructors must authenticate themselves using the platform login system.

### For Students:
1. **Browse & Buy Courses**  
   - Students can browse courses and make secure payments using Stripe.
   
2. **Lifetime Access**  
   - Once purchased, students can access the course content for life.

3. **Track Learning Progress**  
   - Students can see which lectures they've completed and which ones are pending.
   
4. **Mark Lectures as Completed/Incomplete**  
   - Students can mark lectures as "completed" or "incomplete" based on their progress.

5. **Course Dashboard**  
   - Students can track their overall course completion and manage their purchased courses.

6. **Authentication & Authorization**  
   - Students need to register and login to access courses and track their progress.

---

## Requirements

- **Backend**: Node.js, Express.js, MongoDB (for user management, courses, and lecture data)
- **Frontend**: React.js, Redux (for user interface and state management)
- **Authentication**: JWT (JSON Web Tokens) for secure login and session management
- **Payment Gateway**: Stripe API for course payments
- **File Storage**: Cloudinary (for hosting video content and lecture materials)

---

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/MohammedMansoor-Dev/LMS-Platform.git
cd lms
npm i
