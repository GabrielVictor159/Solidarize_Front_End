/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { HeartFilledIcon, HeartIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import styles from "@/styles/pages/index.module.scss";
import { Button, Image } from "@nextui-org/react";
import NextLink from "next/link";
export default function IndexPage() {
	return (
		<>
			<DefaultLayout>
				<>
					<nav className={styles.section1}>
						<div className={styles.section1_containerText}>
							<h1 >Solidarize</h1>
							<p>Nossa plataforma oferece um ambiente acolhedor para a sua doação</p>
						</div>
						<Image
							isZoomed
							className={styles.section1_image}
							alt="Imagem Doação"
							src={"/joel-muniz-A4Ax1ApccfA-unsplash.jpg"}
						/>
					</nav>
					<nav className={styles.section2}>
						<h1>
							Encontre Organizações Para As Suas Doações
						</h1>
						<br />
						<div className={styles.section2_subcontainer}>
							<p>
								Nossa plataforma possui um sistema de geolocalização para auxiliar você
							</p>
							<Image
								isZoomed
								className={styles.section2_image}
								alt="Imagem Google "
								src="/hand-tapping-tablet-with-map.jpg"
							/>
						</div>
						<br/>
						<NextLink href={"/Ongs"}>
						<Button className={styles.section2_button} isIconOnly color="danger"  variant="solid">
							<HeartFilledIcon size={25}/>
        					Doar
      					</Button>  
						</NextLink>
					</nav>
					<nav className={styles.section3}>
						<h1>
							Registre a sua doação
						</h1>
						<br/>
						<div>
						<Image
								isZoomed
								className={styles.section3_image}
								alt="Imagem Google "
								src="/4851429.jpg"
							/>
						<Image
								isZoomed
								className={styles.section3_image}
								alt="Imagem Google "
								src="/Checklist.jpg"
							/>
						<Image
								isZoomed
								className={styles.section3_image}
								alt="Imagem Google "
								src="/4669613.jpg"
							/>
						</div>
						<br/>
						<NextLink href={"/Donations"}>
						<Button className={styles.section3_button} isIconOnly color="danger"  variant="solid">
							<img className={styles.section3_button_icon} src="/icons8-signing-a-document-100.png"/>
        					Doações
      					</Button>  
						</NextLink>
					</nav>
				</>
			</DefaultLayout>
		</>
	);
}
