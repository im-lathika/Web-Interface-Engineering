import React, { useRef, useState } from "react";
import "./FormValidation.css";

const MAX_PHOTO_DIMENSION = 400;
const JPEG_QUALITY = 0.7;

const INITIAL_STATE = {
  username: "", aadharName: "", dob: "", gender: "", email: "", phone: "",
  password: "", confirmPassword: "", address: "", city: "", pincode: "",
  photo: null, occupation: "", altPhone: "", message: "",
};

const NAME_REGEX = /^[A-Za-z\s]{3,50}$/;
const AADHAR_NAME_REGEX = /^[A-Za-z\s.]{3,50}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.?_-])[A-Za-z\d!@#$%^&*.?_-]{8,}$/;
const PINCODE_REGEX = /^\d{6}$/;
const CITY_REGEX = /^[A-Za-z\s]{2,40}$/;

const OPTIONAL_FIELDS = ["occupation", "altPhone", "message"];

function calculateAge(dobString) {
  const dob = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

const Label = ({ htmlFor, required, children }) => (
  <label htmlFor={htmlFor} className="dv-label">
    {children}
    {required ? <span className="dv-star">*</span> : <span className="dv-optional-tag">optional</span>}
  </label>
);

const SectionTitle = ({ index, children }) => (
  <div className="dv-section-head">
    <span className="dv-section-index">{index}</span>
    <h2 className="dv-section-title">{children}</h2>
  </div>
);

// Generic field: renders label + input/select/textarea + optional error span.
const Field = ({ type = "text", name, label, required, wide, error, children, ...rest }) => {
  const cls = error ? "dv-input dv-input-error" : "dv-input";
  return (
    <div className={wide ? "dv-field dv-field-wide" : "dv-field"}>
      <Label htmlFor={name} required={required}>{label}</Label>
      {type === "textarea" ? (
        <textarea id={name} name={name} className={cls} {...rest} />
      ) : type === "select" ? (
        <select id={name} name={name} className={cls} {...rest}>{children}</select>
      ) : (
        <input id={name} name={name} type={type} className={cls} {...rest} />
      )}
      {error && <span className="dv-error">{error}</span>}
    </div>
  );
};

const PasswordField = ({
  name, label, value, show, setShow, placeholder, autoComplete,
  error, onChange, onBlur,
}) => (
  <div className="dv-field">
    <Label htmlFor={name} required>{label}</Label>
    <div className="dv-password-wrap">
      <input
        id={name}
        name={name}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        className={error ? "dv-input dv-input-error" : "dv-input"}
      />
      <button
        type="button"
        className="dv-password-toggle"
        onClick={() => setShow((prev) => !prev)}
        aria-label={show ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
        aria-pressed={show}
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
    {error && <span className="dv-error">{error}</span>}
  </div>
);

function FormValidation() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoMeta, setPhotoMeta] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRef = useRef(null);

  const setField = (name, value) => setFormData((prev) => ({ ...prev, [name]: value }));

  const validateField = (name, value) => {
    const isOptional = OPTIONAL_FIELDS.includes(name);
    const isEmpty = value === "" || value === null || (typeof value === "string" && !value.trim());
    if (isOptional && isEmpty) return "";

    switch (name) {
      case "username":
        if (!value.trim()) return "Username is required.";
        if (!NAME_REGEX.test(value.trim())) return "Use letters and spaces only.";
        return "";

      case "aadharName": {
        if (!value.trim()) return "Name as per Aadhar is required.";
        if (!AADHAR_NAME_REGEX.test(value.trim())) return "Use letters, spaces or dots only.";
        const norm = (s) => s.trim().toLowerCase().replace(/[.\s]/g, "");
        if (formData.username.trim() && norm(value) !== norm(formData.username)) {
          return "Aadhar name must match username.";
        }
        return "";
      }

      case "dob":
        if (!value) return "Date of birth is required.";
        if (new Date(value) > new Date()) return "Date of birth cannot be in future.";
        if (calculateAge(value) < 18) return "You must be at least 18 years old.";
        return "";

      case "gender":
        return value ? "" : "Please select gender.";

      case "email":
        if (!value.trim()) return "Email is required.";
        if (!EMAIL_REGEX.test(value.trim())) return "Enter a valid email.";
        return "";

      case "phone":
        if (!value) return "Phone number is required.";
        if (!PHONE_REGEX.test(value)) return "Enter valid 10-digit number.";
        return "";

      case "password":
        if (!value) return "Password is required.";
        if (!PASSWORD_REGEX.test(value)) return "Use 8+ chars, upper, lower, number & symbol.";
        return "";

      case "confirmPassword":
        if (!value) return "Please confirm password.";
        if (value !== formData.password) return "Passwords do not match.";
        return "";

      case "address":
        if (!value.trim()) return "Address is required.";
        if (value.trim().length < 10) return "Address should be at least 10 characters.";
        return "";

      case "city":
        if (!value.trim()) return "City is required.";
        if (!CITY_REGEX.test(value.trim())) return "Enter a valid city.";
        return "";

      case "pincode":
        if (!value) return "Pincode is required.";
        if (!PINCODE_REGEX.test(value)) return "Pincode must be 6 digits.";
        return "";

      case "photo":
        return value ? "" : "Photo upload is required.";

      case "altPhone":
        return PHONE_REGEX.test(value) ? "" : "Enter valid alternate number.";

      default:
        return "";
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" || name === "altPhone" || name === "pincode") {
      const maxLength = name === "pincode" ? 6 : 10;
      setField(name, value.replace(/\D/g, "").slice(0, maxLength));
    } else {
      setField(name, value);
    }

    setErrors((prev) => {
      const next = { ...prev };
      if (next[name]) next[name] = "";

      // If the user edits the password after already typing a confirmation,
      // re-check the match immediately instead of waiting for blur.
      if (name === "password" && formData.confirmPassword) {
        next.confirmPassword =
          value === formData.confirmPassword ? "" : "Passwords do not match.";
      }
      return next;
    });

    if (submitted) setSubmitted(false);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, photo: "Please upload valid image." }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > MAX_PHOTO_DIMENSION) {
          height = Math.round((height * MAX_PHOTO_DIMENSION) / width);
          width = MAX_PHOTO_DIMENSION;
        } else if (height > MAX_PHOTO_DIMENSION) {
          width = Math.round((width * MAX_PHOTO_DIMENSION) / height);
          height = MAX_PHOTO_DIMENSION;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL("image/jpeg", JPEG_QUALITY);
        const approxKb = Math.round((compressedDataUrl.length * 3) / 4 / 1024);

        setPhotoPreview(compressedDataUrl);
        setPhotoMeta({
          originalWidth: img.width, originalHeight: img.height,
          finalWidth: width, finalHeight: height, approxKb,
        });
        setField("photo", compressedDataUrl);
        setErrors((prev) => ({ ...prev, photo: "" }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(false);
    if (validateAll()) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleClear = () => {
    setFormData(INITIAL_STATE);
    setErrors({});
    setPhotoPreview(null);
    setPhotoMeta(null);
    setSubmitted(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="dv-card">
      <div className="dv-brandbar">
        <div className="dv-mark">AR</div>
        <div className="dv-brandtext">
          <span className="dv-brandname">Applicant Registration</span>
          <span className="dv-brandsub">Verified identity form</span>
        </div>
      </div>

      <div className="dv-header">
        <p className="dv-eyebrow">Secure Registration</p>
        <h1 className="dv-title">Your Details</h1>
      </div>

      {submitted && (
        <div className="dv-success">
          All required fields passed validation. Form submitted successfully.
        </div>
      )}

      <form className="dv-form" onSubmit={handleSubmit} noValidate>
        <section className="dv-section">
          <SectionTitle index="01">Identity</SectionTitle>
          <div className="dv-section-grid">
            <Field
              name="username" label="Username" required
              placeholder="e.g. Arun Kumar"
              value={formData.username} onChange={handleChange} onBlur={handleBlur}
              error={errors.username}
            />

            <Field
              name="aadharName" label="Name as per Aadhar" required
              placeholder="Must match username"
              value={formData.aadharName} onChange={handleChange} onBlur={handleBlur}
              error={errors.aadharName}
            />

            <Field
              type="date" name="dob" label="Date of Birth" required
              value={formData.dob} onChange={handleChange} onBlur={handleBlur}
              max={new Date().toISOString().split("T")[0]}
              error={errors.dob}
            />

            <Field
              type="select" name="gender" label="Gender" required
              value={formData.gender} onChange={handleChange} onBlur={handleBlur}
              error={errors.gender}
            >
              <option value="">Select</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </Field>

            <div className="dv-field dv-field-wide">
              <Label htmlFor="photo" required>Photo (auto-compressed)</Label>
              <div className="dv-photo-row">
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                  className={errors.photo ? "dv-input dv-input-error" : "dv-input"}
                />
                {photoPreview && <img src={photoPreview} alt="Preview" className="dv-photo-preview" />}
              </div>
              {photoMeta && (
                <span className="dv-hint">
                  Reduced {photoMeta.originalWidth}×{photoMeta.originalHeight}{" "}
                  →{photoMeta.finalWidth}×{photoMeta.finalHeight}px (~{photoMeta.approxKb} KB)
                </span>
              )}
              {errors.photo && <span className="dv-error">{errors.photo}</span>}
            </div>
          </div>
        </section>

        <section className="dv-section">
          <SectionTitle index="02">Contact Details</SectionTitle>
          <div className="dv-section-grid">
            <Field
              type="email" name="email" label="Email" required
              placeholder="name@example.com"
              value={formData.email} onChange={handleChange} onBlur={handleBlur}
              error={errors.email}
            />

            <Field
              name="phone" label="Phone Number" required
              inputMode="numeric" placeholder="10-digit mobile number"
              value={formData.phone} onChange={handleChange} onBlur={handleBlur}
              error={errors.phone}
            />

            <Field
              name="altPhone" label="Alternate Phone"
              inputMode="numeric" placeholder="Optional second number"
              value={formData.altPhone} onChange={handleChange} onBlur={handleBlur}
              error={errors.altPhone}
            />
          </div>
        </section>

        <section className="dv-section">
          <SectionTitle index="03">Account Security</SectionTitle>
          <div className="dv-section-grid">
            <PasswordField
              name="password" label="Password" value={formData.password}
              show={showPassword} setShow={setShowPassword}
              placeholder="Min 8 chars, upper, lower, number, symbol"
              autoComplete="new-password"
              error={errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <PasswordField
              name="confirmPassword" label="Confirm Password" value={formData.confirmPassword}
              show={showConfirmPassword} setShow={setShowConfirmPassword}
              placeholder="Re-enter password"
              autoComplete="new-password"
              error={errors.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </section>

        <section className="dv-section">
          <SectionTitle index="04">Address</SectionTitle>
          <div className="dv-section-grid">
            <Field
              type="textarea" name="address" label="Address" required wide
              rows="2" placeholder="House no, street, area"
              value={formData.address} onChange={handleChange} onBlur={handleBlur}
              error={errors.address}
            />

            <Field
              name="city" label="City" required
              placeholder="e.g. Puducherry"
              value={formData.city} onChange={handleChange} onBlur={handleBlur}
              error={errors.city}
            />

            <Field
              name="pincode" label="Pincode" required
              inputMode="numeric" placeholder="6-digit pincode"
              value={formData.pincode} onChange={handleChange} onBlur={handleBlur}
              error={errors.pincode}
            />
          </div>
        </section>

        <section className="dv-section dv-section-last">
          <SectionTitle index="05">Additional Information</SectionTitle>
          <div className="dv-section-grid">
            <Field type="select" name="occupation" label="Occupation" value={formData.occupation} onChange={handleChange}>
              <option value="">Select (optional)</option>
              <option value="student">Student</option>
              <option value="employed">Employed</option>
              <option value="self-employed">Self-employed</option>
              <option value="unemployed">Unemployed</option>
            </Field>

            <Field
              type="textarea" name="message" label="Message / Notes" wide
              rows="2" placeholder="Anything else you'd like to add"
              value={formData.message} onChange={handleChange}
            />
          </div>
        </section>

        <div className="dv-actions">
          <p className="dv-footnote">Complete all required fields before submitting.</p>
          <div className="dv-actions-buttons">
            <button type="button" className="dv-btn dv-btn-clear" onClick={handleClear}>Clear</button>
            <button type="submit" className="dv-btn dv-btn-submit">Submit Application</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormValidation;