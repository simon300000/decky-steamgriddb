/* eslint-disable @typescript-eslint/no-unused-vars */
import { Focusable, FocusableProps, Router } from 'decky-frontend-lib';
import { FC } from 'react';
import ReactMarkdown, { Options } from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Markdown: FC<{
  onLinkClick?: () => void,
  focusableProps?: Partial<FocusableProps>
} & Options> = ({
  onLinkClick,
  focusableProps,
  children,
  ...props
}) => {
  return (
    <Focusable {...focusableProps}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        // Match sanitazion from the new site ssr
        disallowedElements={['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img']}
        unwrapDisallowed
        components={{
          // Make links usable
          a: ({node, children, ...linkProps}) => <Focusable
            onActivate={() => {
              if (linkProps.href) {
                Router.NavigateToExternalWeb(linkProps.href);
                onLinkClick?.();
              }
            }}
            style={{ display: 'inline' }}
          >
            <a style={{ textDecoration: 'underline', color: '#1a9fff' }} {...linkProps}>
              {children}
            </a>
          </Focusable>
        }}
        {...props}
      >
        {children}
      </ReactMarkdown>
    </Focusable>
  );
};

export default Markdown;