const API_BASE_URL = "http://localhost:5000/api";

// Drive API calls
export const driveAPI = {
  // Get all placement drives
  getAllDrives: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/drives`);
      if (!response.ok) throw new Error("Failed to fetch drives");
      return await response.json();
    } catch (error) {
      console.error("Error fetching drives:", error);
      throw error;
    }
  },

  // Get single drive
  getDriveById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/drives/${id}`);
      if (!response.ok) throw new Error("Failed to fetch drive");
      return await response.json();
    } catch (error) {
      console.error("Error fetching drive:", error);
      throw error;
    }
  },

  // Create new drive (Admin only)
  createDrive: async (driveData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/drives`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(driveData)
      });
      if (!response.ok) throw new Error("Failed to create drive");
      return await response.json();
    } catch (error) {
      console.error("Error creating drive:", error);
      throw error;
    }
  },

  // Update drive (Admin only)
  updateDrive: async (id, driveData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/drives/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(driveData)
      });
      if (!response.ok) throw new Error("Failed to update drive");
      return await response.json();
    } catch (error) {
      console.error("Error updating drive:", error);
      throw error;
    }
  },

  // Delete drive (Admin only)
  deleteDrive: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/drives/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Failed to delete drive");
      return await response.json();
    } catch (error) {
      console.error("Error deleting drive:", error);
      throw error;
    }
  }
};

// Application API calls
export const applicationAPI = {
  // Apply for a drive
  applyForDrive: async (applicationData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData)
      });
      if (!response.ok) throw new Error("Failed to apply for drive");
      return await response.json();
    } catch (error) {
      console.error("Error applying for drive:", error);
      throw error;
    }
  },

  // Get student's applications
  getStudentApplications: async (studentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/student/${studentId}`);
      if (!response.ok) throw new Error("Failed to fetch applications");
      return await response.json();
    } catch (error) {
      console.error("Error fetching applications:", error);
      throw error;
    }
  },

  // Get all applications (Admin only)
  getAllApplications: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/applications`);
      if (!response.ok) throw new Error("Failed to fetch applications");
      return await response.json();
    } catch (error) {
      console.error("Error fetching applications:", error);
      throw error;
    }
  },

  // Get applications for a specific drive (Admin only)
  getApplicationsByDrive: async (driveId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/drive/${driveId}`);
      if (!response.ok) throw new Error("Failed to fetch applications");
      return await response.json();
    } catch (error) {
      console.error("Error fetching applications:", error);
      throw error;
    }
  }
};

// Notification API calls
export const notificationAPI = {
  // Get all notifications
  getAllNotifications: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications`);
      if (!response.ok) throw new Error("Failed to fetch notifications");
      return await response.json();
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  },

  // Get notifications for a specific drive
  getNotificationsByDrive: async (driveId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/drive/${driveId}`);
      if (!response.ok) throw new Error("Failed to fetch notifications");
      return await response.json();
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  },

  // Create notification (Admin only)
  createNotification: async (notificationData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notificationData)
      });
      if (!response.ok) throw new Error("Failed to create notification");
      return await response.json();
    } catch (error) {
      console.error("Error creating notification:", error);
      throw error;
    }
  },

  // Delete notification (Admin only)
  deleteNotification: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Failed to delete notification");
      return await response.json();
    } catch (error) {
      console.error("Error deleting notification:", error);
      throw error;
    }
  }
};
