import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import Box from "@/components/ui/Box/Box";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import styles from "./aestheticMaterials.module.css";
import Image from "next/image";
import astheticsStyles from "../style/asthetics..module.css";
import FadeUp from "@/components/ui/animations/FadeUp";

export default function AestheticMaterials({ data }) {
  const { Title, TopContent, BottomContent, MaterialsImages } = data;

  return (
    <section
      className={`${astheticsStyles.section} ${astheticsStyles.aestheticMaterials}`}
    >
      <div className={`${astheticsStyles.box}`}>
        <Box
          fullHeight
          direction="column"
          justify="space-between"
          borderBottom
          mobileBorderBottom="none"
          mobileGap="20px"
          borderColor="#EAEAE8"
        >
          <div className="uppercase">
            <FadeUp>
            {Title}
            </FadeUp>
          </div>
          <div className="heading" style={{ maxWidth: 445 }}>
            <FadeUp>
            <BlocksRenderer content={TopContent || []} />
            </FadeUp>
          </div>
        </Box>
        <Box
          fullHeight
          direction="row"
          justify="space-between"
          align="flex-end"
          padding="0"
          equalChildren
        >
          <div className="p20">
            <FadeUp>
            <Paragraph>
              <BlocksRenderer content={BottomContent || []} />
            </Paragraph>
            </FadeUp>
          </div>
          <div className="p20 text-right hide-mobile">
            <div className={styles.materialsPhoto}>
              <FadeUp>
              {MaterialsImages.map((material, index) => (
                <div key={index}>
                  <Image
                    src={material.url}
                    alt={material.alternativeText || "Material Image"}
                    width={36}
                    height={36}
                  />
                </div>
              ))}
              </FadeUp>
            </div>
          </div>
        </Box>
      </div>
    </section>
  );
}
