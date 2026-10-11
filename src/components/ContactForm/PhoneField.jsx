import PhoneInput from "react-phone-number-input";
import en from "react-phone-number-input/locale/en";
import "react-phone-number-input/style.css";
import styles from "./ContactForm.module.css";
export default function PhoneField({ value, onChange, error }) {
  return (
    <div className={styles.phone}>
      <label htmlFor="phone">
        Phone number <span>*</span>
      </label>
      <PhoneInput
        id="phone"
        labels={{ ...en, country: "Country calling code" }}
        defaultCountry="UA"
        international
        value={value}
        onChange={onChange}
        limitMaxLength={false}
        numberInputProps={{
          "aria-invalid": !!error,
          "aria-describedby": error ? "phone-error" : undefined,
          required: true,
          autoComplete: "tel",
        }}
        countrySelectProps={{ "aria-label": "Country calling code" }}
      />
      {error && (
        <span id="phone-error" className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
}
