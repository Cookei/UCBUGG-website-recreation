import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkExtendedTable, {
  extendedTableHandlers,
} from "remark-extended-table";
import markdownStyles from "../styles/Markdown.module.css";
import styles from "../styles/DaLab.module.css";
import { MarkdownNavbar } from "markdown-navbar";

const LabMarkdown = (props) => {
  const { e, markdownReferences } = props;
  return (
    <section id={styles.daLab}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div id={styles.navbar}>
          <MarkdownNavbar
            source={markdownReferences[e.key]}
            ordered={false}
            headingTopOffset={50}
          />
        </div>
        <div id={styles.content}>
          <Markdown
            remarkPlugins={[remarkGfm, remarkExtendedTable]}
            rehypePlugins={[rehypeRaw]}
            remarkRehypeOptions={{
              handlers: { ...extendedTableHandlers },
            }}
            urlTransform={(uri) => {
              return e.images[uri.replace(/%20/g, " ")];
            }}
            className={markdownStyles.markdown}
            components={{
              blockquote(props) {
                const { children } = props;
                let childrenProps = children[1].props.children;
                let classname;
                if (/^\s*\(!important\)\s*\n/g.exec(childrenProps) != null) {
                  childrenProps = childrenProps.replace(
                    /^\s*\(!important\)\s*\n/g,
                    ""
                  );
                  classname = "important";
                } else if (/^\s*\(!info\)\s*\n/g.exec(childrenProps) != null) {
                  childrenProps = childrenProps.replace(
                    /^\s*\(!info\)\s*\n/g,
                    ""
                  );
                  classname = "info";
                }
                return (
                  <blockquote children={childrenProps} className={classname} />
                );
              },
            }}
          >
            {markdownReferences[e.key]}
          </Markdown>
        </div>
      </div>
    </section>
  );
};

export default LabMarkdown;
