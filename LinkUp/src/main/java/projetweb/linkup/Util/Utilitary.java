package projetweb.linkup.Util;

import jdk.jshell.execution.Util;

import java.util.List;

public abstract class Utilitary {
    private Utilitary() {}

    public final static String EXCEPTION_MESSAGE_DUPLICATION_EMAIL = "Cet email est deja utilise";
    public final static String EXCEPTION_MESSAGE_DUPLICATION_USERNAME = "Ce username est deja utilise";
    public final static String EXCEPTION_MESSAGE_INVALID_EMAIL = "Cet email n'est pas valide";
    public final static String EXCEPTION_MESSAGE_INVALID_PASSWORD = "Le mot de passe doit contenir au moins 8 caracteres, une majuscule, une minuscule et un chiffre";
    public final static String EXCEPTION_MESSAGE_INVALID_USERNAME = "Le username doit contenir au moins 3 caracteres et ne doit pas contenir d'espaces";
    public final static String EXCEPTION_MESSAGE_INVALID_NAME = "Le nom doit contenir au moins 2 caracteres et ne doit pas contenir de chiffres";
    public final static String EXCEPTION_MESSAGE_INVALID_ECOLE = "Le nom de l'ecole doit contenir au moins 2 caracteres et ne doit pas contenir de chiffres";
    public final static String EXCEPTION_MESSAGE_NON_EXISTANT = "L'etudiant n'existe pas";
    public final static String EXCEPTION_MESSAGE_IDENTIFIANTS_INVALIDES = "Email ou mot de passe invalide";
    public final static  String EXCEPTION_MESSAGE_CHAMPS_MANQUANTS = "Tous les champs sont obligatoires";
    public final static String EXCEPTION_MESSAGE_CONTRAINTE_UNIQUE = "Une contrainte unique a ete violee";
    public final static String EXCEPTION_MESSAGE_UNAUTHORIZED = "Vous n'etes pas autorise a effectuer cette action";
    public final static String EXCEPTION_CHAMPS_MANQUANTS = "Tous les champs sont obligatoires";
    public final static String EXCEPTION_UTILISATEUR_NON_TROUVER = "cet utilisateur est introuvable";
    public final static String EXCEPTION_ACTIVITE_GROUPE_OVERLAP = "l'activite que vous essayer de saisir est overlapper avec une activite de ";
    public final static String EXCEPTION_OVERLAP = "activite est overlap par une autre";
    public final static String MESSAGE_ETUDIANT_ENLEVER = "L'etudiant a été enlevé avec succes";
    public final static String MESSAGE_ETUDIANT_MODIFICATION = "Le changement a été effectue avec succès";



}
