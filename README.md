## <h1>Sprout Tutor - Learning Management System for Young Children </h1>

<i>Sprout Tutor is a web application that serves as a learning management system (LMS) designed specifically for young children. It provides a fun and interactive platform for children to enhance their educational journey through engaging learning materials, interactive exercises, and personalized progress tracking. This README file provides an overview of Sprout Tutor, its features, installation instructions, and usage guidelines.</i>


<h2>Installation</h2>
To run Sprout Tutor locally, follow these steps:
<ol>
  <li>Clone the repository: <code>git clone https://github.com/VictorJoshuaC/sprout-tutor.git</code></li>
  <li>Navigate to the project directory: <code>cd sprout-tutor</code></li>
  <li>Install dependencies: <code>npm install</code></li>
  <li>Set up the environment variables by creating a <code>.env</code> file. Refer to the provided <code>.env.example</code> file for the required variables and their values.</li>
  <li>Start the application: <code>npm start</code></li>
  <li>Open your web browser and visit <a href="http://localhost:3000">http://localhost:3000</a> to access Sprout Tutor.</li>
</ol>

<h2>API Documentation</h2>
Click [here](https://documenter.getpostman.com/view/23002744/2s93m4Yi7H) to view the API documentation.

<h2>API Live Link</h2>
Click [here](https://sprout-tutor.onrender.com/) to access the live version of the API.

<h2>Features</h2>
Sprout Tutor offers the following features:

<b>Teacher Portal:</b>
<ul>
  <li>Course management: add new courses, edit existing courses, upload course content.</li>
  <li>Progress tracking: view individual student progress and class-wide performance data.</li>
  <li>Communication: interact with students and parents through discussion groups and direct messaging.</li>
  <li>Grading & Assessment: grade student assignments and generate quizzes.</li>
</ul>

<b>Student Portal:</b>
<ul>
  <li>View available courses, enroll in courses, and access course materials.</li>
  <li>Submit assignments and track progress.</li>
  <li>Communication: interact with teachers and peers through discussion groups and direct messaging.</li>
</ul>

<b>Parent Portal:</b>
<ul>
  <li>View child's course progress, grades, and completion rates.</li>
  <li>Communication: interact with teachers and other parents through discussion groups and direct messaging.</li>
</ul>

<h2>Technologies Used</h2>
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>MongoDB</li>
  <li>Mongoose</li>
  <li>JavaScript</li>
</ul>


<h2>License</h2>
<p>This project is licensed under the MIT License. See the LICENSE file for more details.</p>

<h2>API Testing Examples</h2>



<b>Teacher API Testing </b>

- **Route:** POST /api/v1/teacher/courses
- **Request Body:**
  ```
  {
    "title": "Mathematics",
    "description": "Introduction to mathematics",
    "gradeLevel": "3rd Grade"
  }
  ```
- **Expected Response:**
  ```
  {
    "success": true,
    "data": {
      "_id": "60997a1c3a1a4815d8e7f550",
      "title": "Mathematics",
      "description": "Introduction to mathematics",
      "gradeLevel": "3rd Grade",
      "teacherId": "60997a1c3a1a4815d8e7f55a"
    }
  }
  ```

- **Route:** PUT /api/v1/teacher/courses/:courseId
- **Request Body:**
  ```
  {
    "title": "Mathematics (Advanced)",
    "description": "Advanced mathematics course",
    "gradeLevel": "4th Grade"
  }
  ```
- **Expected Response:**
  ```
  {
    "success": true,
    "data": {
      "_id": "60997a1c3a1a4815d8e7f550",
      "title": "Mathematics (Advanced)",
      "description": "Advanced mathematics course",
      "gradeLevel": "4th Grade",
      "teacherId": "60997a1c3a1a4815d8e7f55a"
    }
  }
  ```

- **Route:** DELETE /api/v1/teacher/courses/:courseId
- **Expected Response:**
  ```
  {
    "success": true,
    "data": {
      "_id": "60997a1c3a1a4815d8e7f550",
      "title": "Mathematics (Advanced)",
      "description": "Advanced mathematics course",
      "gradeLevel": "4th Grade",
      "teacherId": "60997a1c3a1a4815d8e7f55a"
    }
  }
  ```

- **Route:** POST /api/v1/teacher/courses/:courseId/videos
- **Request Body:**
  ```
  {
    "title": "Introduction to Algebra",
    "url": "https://example.com/video123"
  }
  ```
- **Expected Response:**
  ```
  {
    "success": true,
    "data": {
      "_id": "60997a1c3a1a4815d8e7f553",
      "title": "Introduction to Algebra",
      "url": "https://example.com/video123",
      "courseId": "60997a1c3a1a4815d8e

7f550"
    }
  }
  ```

- **Route:** GET /api/v1/teacher/courses/:courseId/students/:userId
- **Expected Response:**
  ```
  {
    "success": true,
    "data": {
      "courseId": "60997a1c3a1a4815d8e7f550",
      "userId": "60997a1c3a1a4815d8e7f55b"
    }
  }
  ```

<b>Student API Testing Examples</b>

- **Route:** GET /api/v1/student/courses
- **Expected Response:**
  ```
  {
    "success": true,
    "data": [
      {
        "_id": "60997a1c3a1a4815d8e7f550",
        "title": "Mathematics",
        "description": "Introduction to mathematics",
        "gradeLevel": "3rd Grade",
        "teacherId": "60997a1c3a1a4815d8e7f55a"
      },
      {
        "_id": "60997a1c3a1a4815d8e7f551",
        "title": "Science",
        "description": "Introduction to science",
        "gradeLevel": "3rd Grade",
        "teacherId": "60997a1c3a1a4815d8e7f55a"
      }
    ]
  }
  ```

- **Route:** POST /api/v1/student/courses/:courseId/enroll
- **Expected Response:**
  ```
  {
    "success": true,
    "data": {
      "_id": "60997a1c3a1a4815d8e7f550",
      "title": "Mathematics",
      "description": "Introduction to mathematics",
      "gradeLevel": "3rd Grade",
      "teacherId": "60997a1c3a1a4815d8e7f55a"
    }
  }
  ```

- **Route:** GET /api/v1/student/courses/:courseId/progress
- **Expected Response:**
  ```
  {
    "success": true,
    "data": {
      "courseId": "60997a1c3a1a4815d8e7f550",
      "progress": 75
    }
  }
  ```

<b>Parent API Testing Examples</b>

- **Route:** GET /api/v1/parent/courses/:courseId/progress
- **Expected Response:**
  ```
  {
    "success": true,
    "data": {
      "courseId": "60997a1c3a1a4815d8e7f550",
      "progress": 75
    }
  }
  ```

- **Route:** GET /api/v1/parent/courses/:courseId/grades
- **Expected Response:**
  ```
  {
    "success": true,
    "data": {
      "courseId": "60997a1c3a1a4815d8e7f550",
      "grades": [
        {
          "assignment": "Math Quiz 1",
          "grade": 90
        },
        {
          "assignment": "Math Quiz 2",
          "grade": 95
        }
      ]
    }
  }
  ```

- **Route:** POST /api/v1/parent/courses/:courseId/message
- **Request Body:**
  ```
  {
    "recipientId": "60997a1c3a1a4815d8e

7f55a",
    "message": "Hello, I have a question about my child's progress in the Mathematics course."
  }
  ```
- **Expected Response:**
  ```
  {
    "success": true,
    "data": {
      "_id": "60997a1c3a1a4815d8e7f554",
      "senderId": "60997a1c3a1a4815d8e7f55b",
      "recipientId": "60997a1c3a1a4815d8e7f55a",
      "message": "Hello, I have a question about my child's progress in the Mathematics course."
    }
  }
  ```

These are examples of how to test each API using Postman.
<h2>Contributing</h2>
<p>Contributions to Sprout Tutor are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.</p>












 








  
