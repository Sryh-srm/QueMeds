const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const healthService = {
  // Check backend health
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);

      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Health check error:", error);
      throw error;
    }
  },

  // Get feature importance from backend
  async getFeatureImportance() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/feature_importance`
      );

      if (!response.ok) {
        throw new Error(
          `Feature importance failed: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Feature importance error:", error);
      throw error;
    }
  },

  // Predict heart disease risk for a single patient
  async predictPatient(patientData) {
    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        let errorMessage = `Prediction failed: ${response.status}`;

        try {
          const errorData = await response.json();
          errorMessage =
            typeof errorData.detail === "string"
              ? errorData.detail
              : JSON.stringify(errorData.detail || errorData);
        } catch {
          // Keep the HTTP status message if response isn't JSON
        }

        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error("Prediction error:", error);
      throw error;
    }
  },

  // Predict using CSV file
  async predictCSV(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_BASE_URL}/predict/csv`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = `CSV prediction failed: ${response.status}`;

        try {
          const errorData = await response.json();
          errorMessage =
            typeof errorData.detail === "string"
              ? errorData.detail
              : JSON.stringify(errorData.detail || errorData);
        } catch {
          // Keep the HTTP status message if response isn't JSON
        }

        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error("CSV prediction error:", error);
      throw error;
    }
  },
};

export default healthService;
