import React, { Component } from "react";
import Greeter from "./Greeter";
import { RoomView, AddRoomForm, RoomDetail } from "./room";
import { Grid, Divider, Container } from "semantic-ui-react";
import { AuthContext } from "../AuthProvider";
import { get_user } from "../utils";

class HomePage extends Component {
  /*
  Home page is responsible for main UX. It knows the user and 
  their rooms.

  RoomView
    Holds the list of rooms. When a room is clicked, it
    is shown in RoomDetail.

  RoomDetail
    Shows a detailed view of the room aka stuff.

    This space is also reserved for the form to create new rooms.
  */
  static contextType = AuthContext;
  constructor() {
    super();
    // TODO: Previous room is used in case the RoomDetail view is
    // the Add Room form, but user cancels. We should see the previous room.
    // It should be a stack if we need more than 3 rooms to remember.
    this.state = { rooms: [], current_room: null, previous_room: null };

    console.log("HomePage constructor context", this.context);
  }

  async componentDidMount() {
    // Once we know the user name, obtain their info from DB.
    console.log("HomePage componentDidMount context", this.context);
    const { current_user } = this.context.state;
    if (current_user) {
      let u = await get_user(current_user);
      console.log("HomePage componentDidMount u", u);
      if (typeof u === "number") {
        console.log("HomePage componentDidMount error finding user.", u);
        this.context.setLoggedInStatus({ revoked: true });
      } else {
        console.log("HomePage componentDidMount user", u);
        // Load rooms into state
        if (u.rooms.length > 0) {
          this.setState({ rooms: u.rooms });
        }
      }
    }
  }

  addRoom = (new_room_name, stuff = {}) => {
    this.setState((prevState) => ({
      rooms: [...prevState.rooms, { name: new_room_name, stuff: stuff }],
      current_room: new_room_name,
    }));
  };

  setCurrentRoom = (room_name = null, stuff = {}) => {
    if (room_name == "add_room") {
      const { current_room } = this.state;
      this.setState({
        current_room: room_name,
        previous_room: current_room,
      });
    } else if (room_name === null) {
      // The indication user hit cancel on add room button.
      const { previous_room } = this.state;
      this.setState({
        current_room: previous_room,
        previous_room: null,
      });
    } else {
      this.setState({ current_room: room_name });
    }
  };

  render() {
    console.log("Homepage render context", this.context);
    console.log("Homepage render state", this.state);

    const { current_room, rooms } = this.state;

    let detailView;
    if (current_room === null) {
      // Don't show anything.
      detailView = <></>;
    } else if (current_room == "add_room") {
      // Show Add Room detail comp.
      detailView = (
        <AddRoomForm
          setCurrentRoom={this.setCurrentRoom}
          addRoom={this.addRoom}
        ></AddRoomForm>
      );
    } else {
      // Render RoomDetail for current room
      detailView = (
        <RoomDetail
          room={rooms.find((r) => r.name == current_room)}
        ></RoomDetail>
      );
    }
    return (
      <Grid celled container>
        <Grid.Row>
          <Greeter></Greeter>
        </Grid.Row>

        <Grid.Row>
          <Divider fitted hidden></Divider>
        </Grid.Row>

        <Grid.Row columns={3}>
          <Grid.Column width={4}>
            <Grid.Row>
              <RoomView
                addRoom={this.addRoom}
                rooms={rooms}
                setCurrentRoom={this.setCurrentRoom}
              ></RoomView>
            </Grid.Row>
          </Grid.Column>

          <Grid.Column width={2}>
            <Divider hidden vertical></Divider>
          </Grid.Column>

          <Grid.Column width={6}>{detailView}</Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default HomePage;
