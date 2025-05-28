import React, { useContext, useState } from "react";
import { Loader } from "lucide-react";
import { User, Mail, BookOpen, Star, Edit3, LogOut } from "lucide-react";
import AuthContext from "../context/AuthContext";

const ProfilePage: React.FC = () => {
  const { user, updateProfile, logout } = useContext(AuthContext);
  const [name, setName] = useState<string>(user?.name || "");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const stats = {
    booksRead: 47,
    reviewsWritten: 23,
    avgRating: 4.2,
    favorites: 12,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    try {
      setIsSubmitting(true);
      await updateProfile({ name });
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  function getYearFromCreatedAt(createdAt: string): number {
    return new Date(createdAt).getFullYear();
  }

  if (!user) {
    return (
      <div className="flex justify-center py-20">
        <Loader className="h-10 w-10 text-amber-600 animate-spin" />
      </div>
    );
  }
  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{
        background:
          "linear-gradient(135deg, #2d1b0e 0%, #4a2c17 25%, #6b3e2a 50%, #4a2c17 75%, #2d1b0e 100%)",
      }}
    >
      {/* Wood grain texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M0 0h60v30H30V0zM30 30h30v30H30V30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <h1
          className="text-4xl font-bold text-yellow-200 mb-8 text-center"
          style={{ fontFamily: '"Cutive Mono", monospace' }}
        >
          Your Profile
        </h1>

        <div
          className="rounded-xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,153,0.15) 0%, rgba(212,175,55,0.15) 100%)",
            border: "2px solid rgba(212,175,55,0.4)",
            boxShadow:
              "inset 0 0 30px rgba(255,255,153,0.08), 0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          {/* Profile Header */}
          <div
            className="px-6 py-12 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(212,175,55,0.3) 0%, rgba(255,255,153,0.2) 100%)",
              borderBottom: "2px solid rgba(212,175,55,0.3)",
            }}
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{
                backgroundColor: "rgba(255,255,153,0.9)",
                border: "3px solid #d4af37",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              }}
            >
              <User className="h-12 w-12 text-amber-900" />
            </div>
            <h2
              className="text-3xl font-bold text-yellow-200 mb-2"
              style={{ fontFamily: '"Cutive Mono", monospace' }}
            >
              {user.name}
            </h2>
            <p className="text-amber-300 text-lg">
              Member since {getYearFromCreatedAt(user.createdAt)}
            </p>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            {error && (
              <div
                className="p-4 rounded-lg mb-6 border-2"
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  borderColor: "rgba(239, 68, 68, 0.3)",
                  color: "#fca5a5",
                }}
              >
                {error}
              </div>
            )}

            {successMessage && (
              <div
                className="p-4 rounded-lg mb-6 border-2"
                style={{
                  backgroundColor: "rgba(34, 197, 94, 0.1)",
                  borderColor: "rgba(34, 197, 94, 0.3)",
                  color: "#86efac",
                }}
              >
                {successMessage}
              </div>
            )}

            {/* Personal Information */}
            <div className="mb-8">
              <h3
                className="text-2xl font-semibold text-yellow-200 mb-6 flex items-center"
                style={{ fontFamily: '"Cutive Mono", monospace' }}
              >
                <User className="h-6 w-6 mr-3 text-amber-300" />
                Personal Information
              </h3>

              {isEditing ? (
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-yellow-200 mb-2"
                      style={{ fontFamily: '"Cutive Mono", monospace' }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg text-amber-900 placeholder-amber-700 outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                      style={{
                        backgroundColor: "rgba(255,255,153,0.9)",
                        border: "2px solid #d4af37",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-yellow-200 mb-2"
                      style={{ fontFamily: '"Cutive Mono", monospace' }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={user.email}
                      disabled
                      className="w-full px-4 py-3 rounded-lg text-amber-700 cursor-not-allowed opacity-70"
                      style={{
                        backgroundColor: "rgba(255,255,153,0.5)",
                        border: "2px solid rgba(212,175,55,0.5)",
                      }}
                    />
                    <p className="text-xs text-amber-400 mt-2">
                      Email cannot be changed
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`py-3 px-6 font-bold rounded-lg transition-all duration-300 transform ${
                        isSubmitting
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:scale-105 hover:shadow-lg"
                      }`}
                      style={{
                        backgroundColor: "#ffff99",
                        color: "#2d1b0e",
                        border: "2px solid #d4af37",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                        fontFamily: '"Cutive Mono", monospace',
                      }}
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setName(user.name);
                        setError("");
                      }}
                      className="py-3 px-6 font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
                      style={{
                        backgroundColor: "rgba(255,255,153,0.3)",
                        color: "#amber-200",
                        border: "2px solid rgba(212,175,55,0.5)",
                        fontFamily: '"Cutive Mono", monospace',
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-amber-300 mt-1 mr-3" />
                      <div>
                        <p className="text-sm text-amber-400">Name</p>
                        <p className="font-medium text-yellow-200 text-lg">
                          {user.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-amber-300 mt-1 mr-3" />
                      <div>
                        <p className="text-sm text-amber-400">Email</p>
                        <p className="font-medium text-yellow-200 text-lg">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col mt-6">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-yellow-200 hover:text-yellow-100 font-semibold flex items-center transition-colors duration-300"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Reading Stats */}
            <div className="mb-8">
              <h3
                className="text-2xl font-semibold text-yellow-200 mb-6 flex items-center"
                style={{ fontFamily: '"Cutive Mono", monospace' }}
              >
                <BookOpen className="h-6 w-6 mr-3 text-amber-300" />
                Reading Statistics
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div
                  className="p-6 rounded-lg text-center"
                  style={{
                    backgroundColor: "rgba(255,255,153,0.2)",
                    border: "2px solid rgba(212,175,55,0.3)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <p
                    className="text-4xl font-bold text-yellow-200 mb-2"
                    style={{ fontFamily: '"Cutive Mono", monospace' }}
                  >
                    {stats.booksRead}
                  </p>
                  <p className="text-amber-300 font-medium">Books Read</p>
                </div>

                <div
                  className="p-6 rounded-lg text-center"
                  style={{
                    backgroundColor: "rgba(255,255,153,0.2)",
                    border: "2px solid rgba(212,175,55,0.3)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <p
                    className="text-4xl font-bold text-yellow-200 mb-2"
                    style={{ fontFamily: '"Cutive Mono", monospace' }}
                  >
                    {stats.reviewsWritten}
                  </p>
                  <p className="text-amber-300 font-medium">Reviews</p>
                </div>

                <div
                  className="p-6 rounded-lg text-center"
                  style={{
                    backgroundColor: "rgba(255,255,153,0.2)",
                    border: "2px solid rgba(212,175,55,0.3)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="flex justify-center text-yellow-400 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.floor(stats.avgRating)
                            ? "fill-current"
                            : star === Math.ceil(stats.avgRating) &&
                              stats.avgRating % 1 !== 0
                            ? "fill-current opacity-50"
                            : ""
                        }`}
                      />
                    ))}
                  </div>
                  <p
                    className="text-2xl font-bold text-yellow-200 mb-1"
                    style={{ fontFamily: '"Cutive Mono", monospace' }}
                  >
                    {stats.avgRating}
                  </p>
                  <p className="text-amber-300 font-medium">Avg. Rating</p>
                </div>

                <div
                  className="p-6 rounded-lg text-center"
                  style={{
                    backgroundColor: "rgba(255,255,153,0.2)",
                    border: "2px solid rgba(212,175,55,0.3)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <p
                    className="text-4xl font-bold text-yellow-200 mb-2"
                    style={{ fontFamily: '"Cutive Mono", monospace' }}
                  >
                    {stats.favorites}
                  </p>
                  <p className="text-amber-300 font-medium">Favorites</p>
                </div>
              </div>
            </div>

            {/* Sign Out */}
            <div
              className="border-t-2 pt-6"
              style={{ borderColor: "rgba(212,175,55,0.3)" }}
            >
              <button
                onClick={logout}
                className="text-red-400 hover:text-red-300 font-semibold flex items-center transition-colors duration-300"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
