# HireLink - End-to-End Hiring Management Platform

A full-featured web application that manages the complete hiring journey from candidate application to recruiter decision-making. Built as a frontend assessment showcasing advanced state management, form handling, and role-based UI architecture.

## Project Overview

HireLink demonstrates a realistic hiring platform with two distinct user experiences:
- **Candidate Portal**: Public-facing job application system with multi-step forms
- **Recruiter Dashboard**: Admin interface for managing applications through a complete hiring pipeline

## Key Features

### Candidate Experience
- **Job Listings**: Browse open positions with detailed descriptions
- **Multi-Step Application Form**:
  - Personal Information (name, email, phone)
  - Experience & Skills (years of experience, skills, portfolio)
  - Resume Upload (PDF/DOC with validation)
- **Form Validation**: Real-time validation with character limits, email format, and required fields
- **Application Tracking**: Unique application ID generation and confirmation page

### Recruiter Experience
- **Pipeline Board**: Drag-and-drop kanban board with stages:
  - Applied
  - Reviewed
  - Interview Scheduled
  - Offer Sent
- **Candidate Review**: View full applications with scoring (1-5) and notes
- **Interview Scheduler**: Date/time picker with automatic stage progression
- **Offer Management**: Draft and generate mock offer letters

## Tech Stack

- **Framework**: React.js
- **Build Tool**: Vite
- **State Management**: Context API with localStorage persistence
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Form Handling**: Custom validation with real-time feedback
- **Package Manager**: Yarn

## Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd hirelink

# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

The application will be available at `http://localhost:5173`
"The application is now live at  `https://hirelink-pi.vercel.app/`

## Architecture & Design Decisions

### State Management Strategy

**Context API + localStorage**
- Chosen for simplicity and built-in React support
- `JobContext`: Manages job listings, filters, and search state
- `ApplicationContext`: Handles candidate applications and pipeline state
- `localStorage`: Persists data across sessions without backend dependency

**Why not Redux?**
- Context API sufficient for this app's complexity
- Reduces boilerplate and external dependencies
- Easier to understand and maintain for assessment purposes

### Form Architecture

**Multi-Step Form Implementation**
- Step-by-step validation prevents user frustration
- State preserved between steps using React state
- Progress indicator shows completion status
- Each step independently validated before progression

**Validation Strategy**
```javascript
- Client-side validation for immediate feedback
- Email regex pattern matching
- Character limit enforcement (e.g., 500 chars for descriptions)
- File type validation (PDF/DOC only)
- File size limits (5MB max)
```

### Routing Structure

```
/                          → Home/Job Listings
/jobs                      → All Jobs Page with Filters
/jobs/:slug                → Job Details
/apply/:slug               → Multi-Step Application Form
/admin                     → Recruiter Dashboard (Pipeline Board)
/admin/candidate/:id       → Candidate Review Panel
```

### Data Persistence

**localStorage Implementation**
```javascript
{
  "appliedJobs": [...],           // Tracks user applications
  "applications": [...],          // All candidate applications
  "pipelineStages": {...},        // Kanban board state
  "interviewSchedules": [...],    // Scheduled interviews
  "offers": [...]                 // Generated offers
}
```

**Benefits:**
- No backend required for assessment
- Data persists across page refreshes
- Easy to reset for testing
- Simulates real database operations

### Component Architecture

**Reusable Components**
- `JobCard`: Displays job summary in listings
- `FormInput`: Standardized input with validation
- `FileUpload`: Resume upload with drag-and-drop
- `PipelineCard`: Draggable candidate card for kanban
- `Modal`: Reusable modal for forms and confirmations

**Page Components**
- `Home`: Landing page with featured jobs
- `Jobs`: Filterable job listings
- `ProfessionalDetails`: Individual job details
- `ApplicationForm`: Multi-step application wizard
- `AdminDashboard`: Recruiter pipeline board

## 🎨 UI/UX Decisions

### Design Philosophy
- **Clean & Professional**: Minimalist design with focus on usability
- **Responsive First**: Mobile-optimized with progressive enhancement
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation

### Color Palette
- **Primary**: Blue (#2563EB) - Trust and professionalism
- **Success**: Green - Positive actions
- **Warning**: Yellow - Pending states
- **Danger**: Red - Rejections or errors
- **Neutral**: Gray scale for backgrounds and text

### User Feedback
- Loading states for async operations
- Success/error toast notifications
- Form validation messages inline
- Progress indicators for multi-step forms

## Form Validation Rules

### Personal Information
- **Full Name**: Required, 2-50 characters
- **Email**: Required, valid email format
- **Phone**: Required, valid phone number format

### Experience & Skills
- **Years of Experience**: Required, 0-50 range
- **Skills**: Required, comma-separated list
- **Portfolio Link**: Optional, valid URL format

### Resume Upload
- **File Type**: PDF or DOC/DOCX only
- **File Size**: Maximum 5MB
- **Required**: Must upload to proceed

## Features Implementation

### 1. Multi-Step Form
**Step Validation**: Each step validates independently before allowing progression

```javascript
const validateStep = (stepNumber) => {
  switch(stepNumber) {
    case 1: return validatePersonalInfo();
    case 2: return validateExperience();
    case 3: return validateResume();
  }
};
```

### 2. Pipeline Board
**Drag-and-Drop**: Candidates can be moved between stages

```javascript
- Uses HTML5 Drag & Drop API
- Updates localStorage on drop
- Automatic timestamp tracking
- Status change notifications
```

### 3. Application ID Generation
**Unique ID Creation**:
```javascript
const generateApplicationId = () => {
  return `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
```

### 4. Interview Scheduling
**Date/Time Picker**:
- Prevents past dates
- Business hours validation (9 AM - 5 PM)
- Conflict detection
- Auto-stage progression

##  Evaluation Criteria Coverage

### Code Quality
- Component-based architecture
- Reusable utility functions
- Consistent naming conventions
- Clean, readable code with comments

### State Management
- Context API for global state
- localStorage for persistence
- Proper state updates and immutability
- Efficient re-rendering

### Validation
- Multi-layer validation (client-side)
- Real-time feedback
- Error message clarity
- Step-by-step form validation

### User Experience
- Intuitive navigation
- Clear visual feedback
- Responsive design
- Loading and error states

### Architecture
- Scalable folder structure
- Separation of concerns
- Proper routing implementation
- Modular component design

## Testing Scenarios

### Candidate Flow
1. Browse jobs on listing page
2. Click "View Details" to see job description
3. Click "Apply Now" to start application
4. Complete 3-step form with validation
5. Upload resume (test with invalid files)
6. Submit and receive application ID

### Recruiter Flow
1. Navigate to `/admin`
2. View all applications in pipeline
3. Click candidate to review details
4. Add score and notes
5. Schedule interview
6. Move to offer stage
7. Generate offer letter

## State Flow Diagram

```
Job Listing → Job Details → Application Form (Step 1-3) → Confirmation
                                                              ↓
Admin Dashboard ← Application Storage (localStorage) ←-------┘
      ↓
Pipeline Board → Review → Interview → Offer
```

## Roadmap & Future Enhancements

- [ ] Email notifications (mock)
- [ ] Advanced search and filters
- [ ] Candidate profile management
- [ ] Analytics dashboard
- [ ] Export applications to CSV
- [ ] Interview feedback forms
- [ ] Offer negotiation workflow

## Available Scripts

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn preview      # Preview production build
yarn lint         # Run ESLint
```

## Assessment Notes

This project demonstrates:
- Advanced React patterns and hooks
- Complex form handling with validation
- State management architecture
- Role-based UI implementation
- Client-side routing
- Data persistence strategies
- Responsive design principles
- Clean code practices

## License

MIT License - Feel free to use this project for learning purposes.

---

**Built with React, Vite, and Tailwind CSS** | HireLink - Connecting Talent with Opportunity
