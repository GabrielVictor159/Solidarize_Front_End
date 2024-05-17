import DefaultLayout from "@/layouts/default";
import styles from "@/styles/pages/Login/login.module.scss";
export default function IndexPage(){
    return(
        <>
        <DefaultLayout>
            <>
            <nav className={styles.background}>
                <div className={styles.login_box}>
                <div className={styles.login_box_division1}>

                </div>
                <div>

                </div>
                </div>
            </nav>
            </>
        </DefaultLayout>
        </>
    );
}