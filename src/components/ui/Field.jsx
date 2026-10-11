import styles from './Field.module.css';
export default function Field({label,id,error,as:Tag='input',children,...props}){return <div className={styles.field}><label htmlFor={id}>{label}</label><Tag id={id} aria-invalid={!!error} aria-describedby={error?`${id}-error`:undefined} {...props}>{children}</Tag>{error&&<span id={`${id}-error`} className={styles.error}>{error}</span>}</div>}
