import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import { getCurrentUser, updateUserProfile } from "../services/auth";

const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Paleo"];

export default function RecipeProfilePage() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({ dietaryPreferences: [] });
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ 
    currentPassword: "", 
    newPassword: "", 
    confirmPassword: "",
    dietaryPreferences: [] 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const userData = await getCurrentUser();
        if (userData) {
          setProfile({
            dietaryPreferences: userData.dietaryPreferences || []
          });
          setForm({ 
            currentPassword: "", 
            newPassword: "", 
            confirmPassword: "",
            dietaryPreferences: userData.dietaryPreferences || [] 
          });
        }
      } catch (err) {
        setError("Failed to load profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleEdit = () => {
    setForm({ 
      currentPassword: "", 
      newPassword: "", 
      confirmPassword: "",
      dietaryPreferences: profile.dietaryPreferences || [] 
    });
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDietaryToggle = (diet) => {
    setForm((prev) => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.includes(diet)
        ? prev.dietaryPreferences.filter((d) => d !== diet)
        : [...prev.dietaryPreferences, diet],
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      // Validate password change if passwords are provided
      if (form.newPassword || form.currentPassword) {
        if (!form.currentPassword) {
          setError("Please enter your current password");
          setSaving(false);
          return;
        }
        if (!form.newPassword) {
          setError("Please enter a new password");
          setSaving(false);
          return;
        }
        if (form.newPassword.length < 6) {
          setError("New password must be at least 6 characters long");
          setSaving(false);
          return;
        }
        if (form.newPassword !== form.confirmPassword) {
          setError("New password and confirm password do not match");
          setSaving(false);
          return;
        }
      }

      const updateData = {
        dietaryPreferences: form.dietaryPreferences,
      };

      if (form.currentPassword && form.newPassword) {
        updateData.currentPassword = form.currentPassword;
        updateData.newPassword = form.newPassword;
      }

      const updated = await updateUserProfile(updateData);
      setProfile({
        dietaryPreferences: updated.dietaryPreferences || []
      });
      setEditMode(false);
      setSuccess("Profile updated successfully!");
      setForm({ 
        currentPassword: "", 
        newPassword: "", 
        confirmPassword: "",
        dietaryPreferences: updated.dietaryPreferences || [] 
      });
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{
        flex: 1,
        padding: '40px 20px',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          padding: '40px'
        }}>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>Loading profile...</p>
          ) : !user ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>Please log in to view your profile.</p>
          ) : (
            <>
              {error && (
                <div style={{
                  color: '#ff4444',
                  textAlign: 'center',
                  marginBottom: '20px',
                  fontSize: '14px',
                  padding: '12px',
                  backgroundColor: '#ffebee',
                  borderRadius: '4px'
                }}>
                  {error}
                </div>
              )}
              {success && (
                <div style={{
                  color: '#4caf50',
                  textAlign: 'center',
                  marginBottom: '20px',
                  fontSize: '14px',
                  padding: '12px',
                  backgroundColor: '#e8f5e9',
                  borderRadius: '4px'
                }}>
                  {success}
                </div>
              )}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                marginBottom: '30px',
                paddingBottom: '20px',
                borderBottom: '1px solid #e0e0e0'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#4caf50',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>
                  U
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>
                    Profile Settings
                  </h2>
                  <p style={{ fontSize: '14px', color: '#666' }}>Manage your password and dietary preferences</p>
                </div>
                <button
                  onClick={handleEdit}
                  disabled={editMode}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: editMode ? '#cccccc' : '#4caf50',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: editMode ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (!editMode) {
                      e.target.style.backgroundColor = '#45a049';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!editMode) {
                      e.target.style.backgroundColor = '#4caf50';
                    }
                  }}
                >
                  Edit
                </button>
              </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            {/* Password Change Section */}
            <div style={{
              padding: '20px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '16px' }}>
                Change Password
              </h3>
              {editMode ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <ProfileField
                    label="Current Password"
                    editMode={true}
                    formValue={form.currentPassword}
                    name="currentPassword"
                    type="password"
                    onChange={handleChange}
                  />
                  <ProfileField
                    label="New Password"
                    editMode={true}
                    formValue={form.newPassword}
                    name="newPassword"
                    type="password"
                    onChange={handleChange}
                  />
                  <ProfileField
                    label="Confirm New Password"
                    editMode={true}
                    formValue={form.confirmPassword}
                    name="confirmPassword"
                    type="password"
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <p style={{ fontSize: '14px', color: '#666' }}>
                  Click Edit to change your password
                </p>
              )}
            </div>

            {/* Dietary Preferences Section */}
            <div style={{
              padding: '20px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '16px' }}>
                Dietary Preferences
              </h3>
              {editMode ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {dietaryOptions.map((diet) => {
                    const isSelected = form.dietaryPreferences.includes(diet);
                    return (
                      <button
                        key={diet}
                        type="button"
                        onClick={() => handleDietaryToggle(diet)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '4px',
                          fontSize: '14px',
                          fontWeight: '500',
                          border: '2px solid #4caf50',
                          backgroundColor: isSelected ? '#4caf50' : '#ffffff',
                          color: isSelected ? '#ffffff' : '#4caf50',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.target.style.backgroundColor = '#f0f9f0';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.target.style.backgroundColor = '#ffffff';
                          }
                        }}
                      >
                        {diet}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {profile.dietaryPreferences && profile.dietaryPreferences.length > 0 ? (
                    profile.dietaryPreferences.map((diet) => (
                      <span
                        key={diet}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '4px',
                          fontSize: '14px',
                          fontWeight: '500',
                          backgroundColor: '#e8f5e9',
                          color: '#2e7d32'
                        }}
                      >
                        {diet}
                      </span>
                    ))
                  ) : (
                    <p style={{ fontSize: '14px', color: '#666' }}>
                      No dietary preferences set. Click Edit to add preferences.
                    </p>
                  )}
                </div>
              )}
            </div>
            {editMode && (
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
                marginTop: '20px'
              }}>
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setForm({ 
                      currentPassword: "", 
                      newPassword: "", 
                      confirmPassword: "",
                      dietaryPreferences: profile.dietaryPreferences || [] 
                    });
                    setError("");
                    setSuccess("");
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#f0f0f0',
                    color: '#333',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: saving ? '#cccccc' : '#4caf50',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (!saving) {
                      e.target.style.backgroundColor = '#45a049';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!saving) {
                      e.target.style.backgroundColor = '#4caf50';
                    }
                  }}
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            )}
          </form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ProfileField({ label, editMode, formValue, onChange, name, type = "text" }) {
  return (
    <div>
      <label style={{
        display: 'block',
        fontSize: '12px',
        fontWeight: '500',
        color: '#666',
        marginBottom: '8px',
        textTransform: 'uppercase'
      }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          fontSize: '14px',
          outline: 'none'
        }}
        value={formValue}
        onChange={onChange}
        onFocus={(e) => e.target.style.borderColor = '#4caf50'}
        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
      />
    </div>
  );
}
