import { useQuery } from "@apollo/client";
import Layout from "@components/Layout";
import { Event, Form, Orders, Organization, Personal, Report } from "@components/pages/profile/ProfileCard";
import useStyles from "@components/pages/profile/styles";
import { GET_USER_PROFILE } from "@graphql/users/queries";
import { Avatar, Container, Grid, Typography, useTheme } from "@material-ui/core";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { User } from "src/types/users";

const ID_PREFIX = "profile-";

// Returns a string with the first letter of the given first name,
// and the first letter of the last space-separated part of lastName.
const userInitials = (firstName: string, lastName: string): string => {
  let initials = "";

  // Since "" is falsey, ensures that we have a string to index
  if (firstName) {
    initials += firstName[0];
  }

  if (lastName) {
    const lastNames = lastName.split(" ");
    initials += lastNames[lastNames.length - 1][0];
  }

  return initials;
};

const ProfilePage: NextPage = () => {
  const { data, loading, error } = useQuery<{ user: User }>(GET_USER_PROFILE);
  const router = useRouter();
  const theme = useTheme();
  const classes = useStyles();
  const initials = useMemo(() => (data?.user ? userInitials(data.user.firstName, data.user.lastName) : ""), [data]);

  useEffect(() => {
    if (typeof window === "undefined") {
      if (!loading) {
        if (data?.user === undefined) {
          router.push("/");
        }
      }
    }
  }, [data, loading]);

  if (error)
    return (
      <Layout>
        <p>Errror</p>
      </Layout>
    );
  return (
    <Layout>
      <Head>
        <title>Profil | Forening for studentene ved Industriell Økonomi og Teknologiledelse</title>
        <meta name="description" content="Profilside" />
      </Head>
      <Container>
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{ marginTop: theme.spacing(8), marginBottom: theme.spacing(8) }}
          spacing={2}
        >
          <>
            <Grid item>
              <Avatar className={classes.large} style={{ backgroundColor: "#526fa0" }}>
                {data?.user && (
                  <Typography variant="h3" component="p">
                    {initials}
                  </Typography>
                )}
              </Avatar>
            </Grid>
            <Grid
              container
              item
              direction="column"
              alignItems="center"
              xs={10}
              style={{ marginBottom: theme.spacing(4) }}
            >
              <Grid item>
                {data && <Typography variant="subtitle1" component="h1">{`Hei, ${data.user.firstName}`}</Typography>}
              </Grid>
              <Grid item>
                <Typography variant="body2" align="center">
                  Her kan du endre din informasjon, se tidligere arrangementer og organisasjonene der du er medlem.
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              item
              className={classes.cards}
              spacing={4}
              justifyContent="center"
              sm={10}
              xs={12}
              alignItems="stretch"
            >
              <Grid item md={6}>
                <Personal user={data?.user} data-test-id={`${ID_PREFIX}personal-`} />
              </Grid>
              <Grid item md={6}>
                <Event data-test-id={`${ID_PREFIX}event-`} />
              </Grid>
              <Grid item md={6}>
                <Organization data-test-id={`${ID_PREFIX}organization-`} />
              </Grid>
              <Grid item md={6}>
                <Form data-test-id={`${ID_PREFIX}form-`} />
              </Grid>
              <Grid item md={6}>
                <Report data-test-id={`${ID_PREFIX}report-`} />
              </Grid>
              <Grid item md={6}>
                <Orders data-test-id={`${ID_PREFIX}orders-`} />
              </Grid>
            </Grid>
          </>
        </Grid>
      </Container>
    </Layout>
  );
};

export default ProfilePage;