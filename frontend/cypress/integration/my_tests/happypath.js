context('Happy Path', () => {
  beforeEach(() => {
      cy.visit('localhost:3000');
  });

  it('Successfully register', () => {
    const email = 'chan12345@email.com';
    const password = '123';
    const confirmPassword = '123';
    const name = 'chan';

    // nagivating to register screen
    cy.get('button[id=basic-button]')
      .click();

    cy.get('li[name=registerButton]')
      .click();

    // registering account
    cy.get('input[name=email]')
      .focus()
      .type(email);

    cy.get('input[name=password]')
      .focus()
      .type(password);

    cy.get('input[name=confirmPassword]')
      .focus()
      .type(confirmPassword);

    cy.get('input[name=name]')
      .focus()
      .type(name);

    cy.get('button[name=submitButton]')
      .click();

    // navigating to login screen
    cy.get('button[id=basic-button]')
      .click();

    cy.get('li[name=loginButton]')
      .click();

    //logging in 
    cy.get('input[name=loginEmail]')
      .focus()
      .type(email);
    
    cy.get('input[name=loginPassword]')
      .focus()
      .type(password);

    cy.get('button[name=loginSubmitButton]')
      .click();

    // nagivating to create listing screen
    cy.get('button[id=basic-button]')
      .click();

    cy.get('li[name=myListingsButton]')
      .click();

    cy.get('button[name=createListingButton]')
      .click(); 

    // creating a listing
    const title = 'testing house'; 
    const street = 'test street';
    const city = 'sydney';
    const state = 'nsw';
    const postcode = '2166';
    const price = 500; 
    const thumbnail = 'https://res.cloudinary.com/porter-davis/image/upload/w_596,q_auto:low/pd-web/2020/12/Mont-Albert3-scaled-3.jpg';
    const bathrooms = 5;
    const propType = 'double story house';
    const amenities = 'Wifi, Carbonmoxide detector';
    const beds = 1;
    const bedType1 = '1 King';

    cy.get('input[id=title]')
      .focus()
      .type(title);
    cy.get('input[id=street]')
      .focus()
      .type(street);
    cy.get('input[id=city]')
      .focus()
      .type(city);
    cy.get('input[id=state]')
      .focus()
      .type(state);
    cy.get('input[id=postcode]')
      .focus()
      .type(postcode);
    cy.get('input[id=price]')
      .focus()
      .type(price);
    cy.get('input[id=thumbnail]')
      .focus()
      .type(thumbnail);
    cy.get('input[id=bathrooms]')
      .focus()
      .type(bathrooms);
    cy.get('input[id=propType]')
      .focus()
      .type(propType);
    cy.get('input[id=amenities]')
      .focus()
      .type(amenities);
    cy.get('input[id=beds]')
      .focus()
      .type(beds);
    cy.get('input[id=bedroom0]')
      .focus()
      .type(bedType1);
    cy.get('button[name=submitListingButton]')
      .click();
    
    cy.get('td[name=hostedListingCard')
      .click();
    cy.get('input[id=title]')
      .focus()
      .clear()
      .type('new listing title');
    cy.get('input[id=thumbnail]')
      .focus()
      .clear()
      .type('https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');

    cy.get('button[name=submitEditButton]')
      .click();

    cy.get('input[type=tel]')
      .focus()
      .type('19/11/2021');
  })
})