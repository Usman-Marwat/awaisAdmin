import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import '../i18n';

function Text({ children: text, ...otherProps }) {
	const { t } = useTranslation();

	return <Typography {...otherProps}>{t(text)}</Typography>;
}

export default Text;
