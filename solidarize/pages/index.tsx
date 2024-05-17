
import { HeartFilledIcon, HeartIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import styles from "@/styles/pages/index.module.scss";
import { Button, Image } from "@nextui-org/react";

export default function IndexPage() {
	return (
		<>
			<DefaultLayout>
				<>
					<nav className={styles.section1}>
						<div>
							<h1 >Solidarize</h1>
							<p>Nossa plataforma oferece um ambiente acolhedor para a sua doação</p>
						</div>
						<Image
							className={styles.section1_image}
							alt="Imagem Doação"
							src="/joel-muniz-A4Ax1ApccfA-unsplash.jpg"
						/>
					</nav>
					<nav className={styles.section2}>
						<h1>
							Encontre Organizações Para As Suas Doações
						</h1>
						<br />
						<div>
							<p>
								Nossa plataforma possui um sistema de geolocalização para auxiliar você
							</p>
							<Image
								className={styles.section2_image}
								alt="Imagem Google Map"
								src="/hand-tapping-tablet-with-map.jpg"
							/>
						</div>
						<br/>
						<Button className={styles.section2_button} isIconOnly color="danger"  variant="solid">
							<HeartFilledIcon size={25}/>
        					Doar
      					</Button>  
					</nav>
					<nav className={styles.section3}>

					</nav>
				</>
			</DefaultLayout>
		</>
	);
}
