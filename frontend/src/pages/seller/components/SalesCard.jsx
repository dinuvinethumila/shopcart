import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';

import { forwardRef } from 'react';
import { Icon } from '@iconify/react';
import CountUp from 'react-countup';

const SalesCard = ({ title, total, color, icon }) => {
    return (
        <Card
            sx={{
                py: 3,
                px: 2,
                boxShadow: 2,
                textAlign: 'center',
                color: (theme) => theme.palette.text.primary,
                backgroundImage: (theme) =>
                    linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.2)} 100%),
                borderRadius: 2,
                width: 250,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                },
            }}
        >
            <StyledIcon
                sx={{
                    backgroundColor: (theme) => theme.palette.info.main,
                    color: '#fff',
                    boxShadow: 1,
                    '&:hover': {
                        boxShadow: 4,
                    },
                }}
            >
                <Iconify icon={icon} width={22} height={22} />
            </StyledIcon>
    
            <CountUpStyled start={0} end={total} duration={5} sx={{ color: (theme) => theme.palette.success.main }} />
    
            <Typography variant="subtitle1" sx={{ opacity: 0.8, fontWeight: 500, color: (theme) => theme.palette.warning.main }}>
                {title}
            </Typography>
        </Card>
    );
}
    export default SalesCard;
    
    const Iconify = forwardRef(({ icon, width = 20, sx, ...other }, ref) => (
        <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
    ));
    
    const CountUpStyled = styled(CountUp)`
        margin: 0;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        font-weight: 700;
        font-size: 2.5rem;
        line-height: 1.167;
        letter-spacing: 0em;
    `;
    
    const StyledIcon = styled('div')(({ theme }) => ({
        margin: 'auto',
        display: 'flex',
        borderRadius: '50%',
        alignItems: 'center',
        width: theme.spacing(7),
        height: theme.spacing(7),
        justifyContent: 'center',
        marginBottom: theme.spacing(2),
        boxShadow: theme.shadows[1],
    }));
