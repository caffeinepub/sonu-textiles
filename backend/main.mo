import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Bool "mo:core/Bool";

actor {
  // Type Definitions
  type MehndiDesign = {
    name : Text;
    description : Text;
    imageUrl : Text;
    price : Nat;
  };

  type ClothingItem = {
    name : Text;
    nameHindi : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
  };

  // Mehndi Designs Persistence
  let mehndiDesigns = Map.empty<Nat, MehndiDesign>();

  // Core Clothing Items
  let clothingItems = Map.empty<Nat, ClothingItem>();

  // ContactMessage Persistence
  type ContactMessage = {
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  let contactMessages = Map.empty<Nat, ContactMessage>();

  // Core Mehndi Designs
  let coreMehndiDesigns : [MehndiDesign] = [
    {
      name = "Simple Floral";
      description = "Classic floral pattern for hands";
      imageUrl = "https://example.com/floral.jpg";
      price = 200;
    },
    {
      name = "Bridal Special";
      description = "Intricate bridal design";
      imageUrl = "https://example.com/bridal.jpg";
      price = 2000;
    },
  ];

  // Core Clothing Items
  let coreClothingItems : [ClothingItem] = [
    {
      name = "Saree";
      nameHindi = "साड़ी";
      description = "Elegant traditional garment";
      price = 1200;
      imageUrl = "https://example.com/saree.jpg";
    },
    {
      name = "Lehenga";
      nameHindi = "लहंगा";
      description = "Designer lehenga for weddings";
      price = 3000;
      imageUrl = "https://example.com/lehenga.jpg";
    },
  ];

  // Comparison Functions for sorting
  module ClothingItem {
    public func compareByPrice(item1 : ClothingItem, item2 : ClothingItem) : Order.Order {
      Int.compare(item1.price, item2.price);
    };
  };

  module MehndiDesign {
    public func compareByPrice(design1 : MehndiDesign, design2 : MehndiDesign) : Order.Order {
      Int.compare(design1.price, design2.price);
    };
  };

  // Public Functions for Products and Designs Retrieval
  public query ({ caller }) func getClothingItemsByPrice() : async [ClothingItem] {
    let items = clothingItems.values().toArray().concat(coreClothingItems);
    items.sort(ClothingItem.compareByPrice);
  };

  public query ({ caller }) func getMehndiDesignsByPrice() : async [MehndiDesign] {
    let designs = mehndiDesigns.values().toArray().concat(coreMehndiDesigns);
    designs.sort(MehndiDesign.compareByPrice);
  };

  // Contact Message Functions
  public shared ({ caller }) func submitContactMessage(name : Text, phone : Text, email : Text, message : Text) : async () {
    let id = contactMessages.size();
    let contactMessage : ContactMessage = {
      name;
      phone;
      email;
      message;
      timestamp = Time.now();
    };
    contactMessages.add(id, contactMessage);
  };

  // Core combined Contact Messages
  public query ({ caller }) func getContactMessages() : async [ContactMessage] {
    contactMessages.values().toArray();
  };

  // Business Contacts
  public query ({ caller }) func getBusinessInfo() : async {
    phone : Text;
    location : Text;
  } {
    {
      phone = "+91 1234567890";
      location = "Patna, Bihar, India";
    };
  };
};
