import styles from './Button.module.css';
export default function Button({href,children,secondary=false,small=false,...props}){const Tag=href?'a':'button';return <Tag href={href} className={`${styles.button} ${secondary?styles.secondary:''} ${small?styles.small:''}`} {...props}>{children}</Tag>}
