public with sharing class AccountGridController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountsWithContacts(){
        return [SELECT Id, Name, Owner.Name, Owner.FullPhotoUrl, Phone, NumberOfEmployees, BillingCity, (SELECT Id, Name, Email, Phone FROM Contacts) FROM Account ORDER BY CreatedDate ASC LIMIT 15];
    }
}
