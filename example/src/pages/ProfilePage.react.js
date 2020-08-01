// @flow

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  Button,
  Form,
  Profile,
  StatsCard,
  colors,
  Dimmer,
} from "tabler-react";

import C3Chart from "react-c3js";

import SiteWrapper from "../SiteWrapper.react";

import { getUserAuthData, startFetchingAccountData } from "../store/store";

function ProfilePage({ history }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state);
  const hash = window.location.hash;

  if (user.error || hash === "") {
    history.push("/login");
  }

  if (!user.data && !user.gettingAccountInfo) {
    dispatch(startFetchingAccountData());
    dispatch(getUserAuthData(window.location.hash));
  }

  return (
    <SiteWrapper>
      <div className="my-3 my-md-5">
        <Container>
          {user.data ? (
            <Grid.Row>
              <Grid.Col lg={4}>
                <Profile
                  name={`${user.data.firstName} ${user.data.lastName}`}
                  backgroundURL="demo/photos/eberhard-grossgasteiger-311213-500.jpg"
                  avatarURL={user.authUser.picture}
                  twitterURL="test"
                >
                  {user.data.desc}
                </Profile>
              </Grid.Col>
              <Grid.Col lg={8}>
                <Grid.Row cards={true}>
                  <Grid.Col width={4}>
                    <StatsCard
                      layout={1}
                      movement={6}
                      total="43"
                      label="New Tickets"
                    />
                  </Grid.Col>
                  <Grid.Col width={4}>
                    <StatsCard
                      layout={1}
                      movement={-3}
                      total="17"
                      label="Closed Today"
                    />
                  </Grid.Col>
                  <Grid.Col width={4}>
                    <StatsCard
                      layout={1}
                      movement={9}
                      total="7"
                      label="New Replies"
                    />
                  </Grid.Col>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Col width={12}>
                    <Card>
                      <Card.Header>
                        <Card.Title>Development Activity</Card.Title>
                      </Card.Header>
                      <C3Chart
                        style={{ height: "10rem" }}
                        data={{
                          columns: [
                            // each columns data
                            [
                              "data1",
                              0,
                              5,
                              1,
                              2,
                              7,
                              5,
                              6,
                              8,
                              24,
                              7,
                              12,
                              5,
                              6,
                              3,
                              2,
                              2,
                              6,
                              30,
                              10,
                              10,
                              15,
                              14,
                              47,
                              65,
                              55,
                            ],
                          ],
                          type: "area", // default type of chart
                          groups: [["data1", "data2", "data3"]],
                          colors: {
                            data1: colors["blue"],
                          },
                          names: {
                            // name of each serie
                            data1: "Purchases",
                          },
                        }}
                        axis={{
                          y: {
                            padding: {
                              bottom: 0,
                            },
                            show: false,
                            tick: {
                              outer: false,
                            },
                          },
                          x: {
                            padding: {
                              left: 0,
                              right: 0,
                            },
                            show: false,
                          },
                        }}
                        legend={{
                          position: "inset",
                          padding: 0,
                          inset: {
                            anchor: "top-left",
                            x: 20,
                            y: 8,
                            step: 10,
                          },
                        }}
                        tooltip={{
                          format: {
                            title: function(x) {
                              return "";
                            },
                          },
                        }}
                        padding={{
                          bottom: 0,
                          left: -1,
                          right: -1,
                        }}
                        point={{
                          show: false,
                        }}
                      />
                    </Card>
                  </Grid.Col>
                </Grid.Row>

                <Form className="card">
                  <Card.Body>
                    <Card.Title>Edit Profile</Card.Title>
                    <Grid.Row>
                      <Grid.Col md={5}>
                        <Form.Group>
                          <Form.Label>Company</Form.Label>
                          <Form.Input
                            type="text"
                            disabled
                            placeholder="Company"
                            value="Creative Code Inc."
                          />
                        </Form.Group>
                      </Grid.Col>
                      <Grid.Col sm={6} md={3}>
                        <Form.Group>
                          <Form.Label>Username</Form.Label>
                          <Form.Input
                            type="text"
                            placeholder="Username"
                            value={user.authUser.nickname}
                          />
                        </Form.Group>
                      </Grid.Col>
                      <Grid.Col sm={6} md={4}>
                        <Form.Group>
                          <Form.Label>Email address</Form.Label>
                          <Form.Input
                            type="email"
                            placeholder="Email"
                            value={user.authUser.email}
                          />
                        </Form.Group>
                      </Grid.Col>
                      <Grid.Col sm={6} md={6}>
                        <Form.Group>
                          <Form.Label>First Name</Form.Label>
                          <Form.Input
                            type="text"
                            placeholder="First Name"
                            value={user.data.firstName}
                          />
                        </Form.Group>
                      </Grid.Col>
                      <Grid.Col sm={6} md={6}>
                        <Form.Group>
                          <Form.Label>Last Name</Form.Label>
                          <Form.Input
                            type="text"
                            placeholder="Last Name"
                            value={user.data.lastName}
                          />
                        </Form.Group>
                      </Grid.Col>
                    </Grid.Row>
                  </Card.Body>
                  <Card.Footer className="text-right">
                    <Button type="submit" color="primary">
                      Update Profile
                    </Button>
                  </Card.Footer>
                </Form>
              </Grid.Col>
            </Grid.Row>
          ) : (
            <Grid.Row>
              <Grid.Col>
                <Dimmer active loader />
              </Grid.Col>
            </Grid.Row>
          )}
        </Container>
      </div>
    </SiteWrapper>
  );
}

export default withRouter(ProfilePage);
