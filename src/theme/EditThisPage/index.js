import React from 'react';
import { ThemeClassNames } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import IconEdit from '@theme/Icon/Edit';

export default function EditThisPage({ editUrl }) {
    return (
        <Link
            to={editUrl}
            title="Edit this page"
            className={ThemeClassNames.common.editThisPage}
            style={{ lineHeight: 1 }}
        >
            <IconEdit />
        </Link>
    );
}
