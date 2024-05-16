
import DefaultLayout from "@/layouts/default";
import styles from "@/styles/pages/index.module.scss";
import { Image } from "@nextui-org/react";

export default function IndexPage() {
	return (
		<>
			<DefaultLayout>
				<>
					<nav className={styles.section1}>
						<div>
							<h1>Solidarize</h1>
							<p>Nossa plataforma oferece um ambiente acolhedor para a sua doação</p>
						</div>
						<Image
							className={styles.section1_image}
							alt="NextUI hero Image with delay"
							src="/joel-muniz-A4Ax1ApccfA-unsplash.jpg"
						/>
					</nav>
					<nav className={styles.section2}>

					</nav>
					<nav className={styles.section3}>
						
					</nav>
				</>
			</DefaultLayout>
		</>
	);
}
