import React from 'react';
import { Card, CardContent, Typography, Chip, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    minWidth: 300,
    maxWidth: 400,
    margin: theme.spacing(3),
    backgroundColor: 'white', // Light, semi-transparent background
    backdropFilter: 'blur(15px)', // Stronger blur effect
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)', // Softer shadow for depth
    borderRadius: '20px',
    transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s',
    '&:hover': {
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)', // Enhanced shadow on hover
        transform: 'scale(1.05)', // Slightly larger on hover
        backgroundColor: 'rgba(255, 255, 255, 1)', // Less transparent on hover
    },
}));

const ChipStyled = styled(Chip)(({ theme }) => ({
    margin: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: 'bold',
}));

const InfoTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    color: theme.palette.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing(1),
}));

const SubTitleTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 400,
    color: theme.palette.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing(2),
}));

const SectionHeaderTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    color: theme.palette.text.primary,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    display: 'inline-block',
    paddingBottom: theme.spacing(0.5),
}));

const CareerCard = ({ career }) => {
    return (
        <StyledCard>
            <CardContent>
                <TitleTypography variant="h4">
                    {career.name}
                </TitleTypography>
                <SubTitleTypography variant="body1">
                    {career.reason}
                </SubTitleTypography>
                
                <Grid container spacing={2} style={{ marginTop: '16px' }}>
                    <Grid item xs={12} md={6}>
                        <InfoTypography variant="body2">
                            <strong>Degree:</strong> {career.required_degree}
                        </InfoTypography>
                        <InfoTypography variant="body2">
                            <strong>Average Salary:</strong> {career.average_salary}
                        </InfoTypography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoTypography variant="body2">
                            <strong>Job Outlook:</strong> {career.job_outlook}
                        </InfoTypography>
                    </Grid>
                </Grid>
                
                <SectionHeaderTypography variant="body2">
                    Key Skills
                </SectionHeaderTypography>
                <div>
                    {career.key_skills.map(skill => (
                        <ChipStyled key={skill} label={skill} />
                    ))}
                </div>
            </CardContent>
        </StyledCard>
    );
};

export default CareerCard;
