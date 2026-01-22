import React, { useState } from "react";

function RTIView() {
  

  const [formData, setFormData] = useState({
    SoId: 8572,
    Comid: 6,
    RTINo: "RTI000006537",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const shareRTI = async () => {
    try {
      let { SoId, Comid, RTINo } = formData;

      if (!RTINo || RTINo === "") {
        RTINo = "DriverRTI";
      }

      const apiUrl =
        "https://maleva.my/api/RTIApp/RTIVIEW?RTINo=" + RTINo;

      const master = {
        SoId: SoId,
        Comid: Comid,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(master),
      });

      const resultData = await response.json();

      if (resultData && resultData.IsSuccess === true) {
        window.open(resultData.Data1, "_blank");
      }
    } catch (error) {
      console.error(error);
      alert("Error opening RTI");
    } finally {
     
    }
  };

  // ✅ ADD STYLES HERE
  const styles = {
    container: {
      maxWidth: 420,
      margin: "30px auto",
      fontFamily: "Arial, sans-serif",
    },
    button: {
      width: "100%",
      padding: "12px",
      fontSize: "15px",
      backgroundColor: "#1976d2",
      color: "#fff",
      border: "none",
      borderRadius: 6,
      cursor: "pointer",
    },
    card: {
      marginTop: 20,
      padding: 20,
      borderRadius: 8,
      backgroundColor: "#f9f9f9",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    title: {
      marginBottom: 15,
      fontSize: 18,
      color: "#333",
    },
    field: {
      marginBottom: 14,
    },
    label: {
      display: "block",
      marginBottom: 6,
      fontSize: 13,
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: 6,
      border: "1px solid #ccc",
      fontSize: 14,
      outline: "none",
    },
  };

  // ✅ JSX USES styles
  return (
    <div style={styles.container}>
   

      <div style={styles.card}>
        <h3 style={styles.title}>RTI Details</h3>

        <div style={styles.field}>
          <label style={styles.label}>RTI No</label>
          <input
            type="text"
            name="RTINo"
            value={formData.RTINo}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>SO ID</label>
          <input
            type="number"
            name="SoId"
            value={formData.SoId}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <button onClick={shareRTI} style={styles.button}>
        Open RTI Report
      </button>
      </div>
    </div>
  );
}

export default RTIView;
