import Divider from "@/components/ui/Divider";
import Heading from "@/components/ui/Heading";
import styles from "./departments.module.css";
import Paragraph from "@/components/ui/Paragraph";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import MediaRenderer from "@/components/common/MediaRenderer";

export default function Departments({ data }) {
    const { DepartmentsHeading, DepartmentLists } = data;
    return (
        <>
        <Heading level={2} className={styles.heading}>
          {DepartmentsHeading}
        </Heading>
        <Divider />
        <div className={`p20 ${styles.dapartmentsList}`}>
            {DepartmentLists.map((item, index) => {
                return (
                    <div key={index} className={styles.department}>
                        <MediaRenderer media={item.Media} height={400} classes={styles.ProcessMedia} />
                        <div className={`text-light uppercase ${styles.departmentTitle}`}>
                            {item.Title}
                        </div>
                        <div className={styles.departmentContent}>
                            <Paragraph>
                            <BlocksRenderer content={item.DepartmentDescription || []} />
                            </Paragraph>
                        </div>
                    </div>
                )
            })}
        </div>
        </>
    )
}