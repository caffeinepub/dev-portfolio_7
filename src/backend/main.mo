import Array "mo:core/Array";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Contact Message Type
  public type ContactMessage = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    subject : Text;
    message : Text;
    timestamp : Int;
    isRead : Bool;
  };

  module ContactMessage {
    public func compare(message1 : ContactMessage, message2 : ContactMessage) : Order.Order {
      Nat.compare(message1.id, message2.id);
    };
  };

  var nextMessageId = 0;
  let messages = Map.empty<Nat, ContactMessage>();

  // Public endpoint - no authorization required (accessible to guests/anonymous users)
  public func submitContactForm(name : Text, email : Text, phone : Text, subject : Text, message : Text) : async Nat {
    let newMessage : ContactMessage = {
      id = nextMessageId;
      name;
      email;
      phone;
      subject;
      message;
      timestamp = Time.now();
      isRead = false;
    };

    messages.add(nextMessageId, newMessage);
    nextMessageId += 1;

    newMessage.id;
  };

  // Admin-only endpoint
  public query ({ caller }) func getAllMessages() : async [ContactMessage] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    messages.values().toArray().sort();
  };

  // Admin-only endpoint
  public shared ({ caller }) func markMessageAsRead(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admin access required");
    };

    switch (messages.get(id)) {
      case (null) { Runtime.trap("Message not found") };
      case (?msg) {
        let updatedMsg = { msg with isRead = true };
        messages.add(id, updatedMsg);
      };
    };
  };

  // Admin-only endpoint
  public shared ({ caller }) func deleteMessage(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admin access required");
    };

    messages.remove(id);
  };

  // Admin-only endpoint
  public query ({ caller }) func getUnreadCount() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admin access required");
    };

    messages.values().toArray().filter(func(msg : ContactMessage) : Bool { not msg.isRead }).size();
  };

  // Admin-only endpoint - get total message count
  public query ({ caller }) func getTotalMessageCount() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admin access required");
    };

    messages.size();
  };
};
