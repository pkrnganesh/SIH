import React from 'react';
import { Card, CardContent, Typography, Skeleton, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCardSkeleton = styled(Card)(({ theme }) => ({
    minWidth: 300,
    maxWidth: 400,
    margin: theme.spacing(3),
    backgroundColor: 'white',
    backdropFilter: 'blur(15px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    borderRadius: '20px',
}));

const SkeletonWrapper = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
}));

const CareerCardSkeleton = () => {
    return (
        <StyledCardSkeleton>
            <SkeletonWrapper>
                <Skeleton variant="text" width={180} height={40} sx={{ marginBottom: 2 }} />
                <Skeleton variant="text" width={200} height={30} sx={{ marginBottom: 4 }} />
                <Grid container spacing={2} style={{ marginTop: '16px' }}>
                    <Grid item xs={12} md={6}>
                        <Skeleton variant="text" width="100%" height={30} sx={{ marginBottom: 1 }} />
                        <Skeleton variant="text" width="100%" height={30} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton variant="text" width="100%" height={30} />
                    </Grid>
                </Grid>
                <Skeleton variant="rectangular" width="100%" height={30} sx={{ marginTop: 2 }} />
                <Skeleton variant="rectangular" width="100%" height={40} sx={{ marginTop: 2 }} />
            </SkeletonWrapper>
        </StyledCardSkeleton>
    );
};

export default CareerCardSkeleton;
