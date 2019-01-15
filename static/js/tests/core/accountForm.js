console.log('this script is running')
describe('validators()', function() {

  it('It should return an error if the email is not valid', function() {
    expect( validators.validateEmail ( "12345" ) ).toBe( "Please enter a valid email address" );
    expect( validators.validateEmail ( "debrac" ) ).toBe( "Please enter a valid email address" );
    expect( validators.validateEmail ( "timothy@" ) ).toBe( "Please enter a valid email address" );
    expect( validators.validateEmail ( "deb@gmail.com" ) ).toBe( "" );
  });

  it('It should return an error if the password is not valid', function() {
    expect( validators.validatePw ( "1debra" ) ).toBe( "Password must contain at least one number, one lowercase and one uppercase letter at least six characters" );
    expect( validators.validatePw ( "Debrac" ) ).toBe( "Password must contain at least one number, one lowercase and one uppercase letter at least six characters" );
    expect( validators.validatePw ( "debrac" ) ).toBe( "Password must contain at least one number, one lowercase and one uppercase letter at least six characters" );
    expect( validators.validatePw ( "2.Debra" ) ).toBe( "" );
  });

  it('It should return an error if the confirm password entered is not the same as the password entered', function() {
    expect( validators.validatePwc ( "2.Debra", "Debrac" ) ).toBe( "Password does not match" );
    expect( validators.validatePwc ( "2.Debra", "2.Debra" ) ).toBe( "" );
  });

});
