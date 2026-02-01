public enum Action {
    QUITTER,
    ACCEPTER,
    REFUSER;

    public static Action readAction() {
        String action_string;
        Action action_enum;
        System.out.println("choisir une action entre quitter accepter ou refuser");
        do {

           action_string = ReadInput.readString();
           action_enum = getAction(action_string);
           if(action_enum == null) {
               System.out.println("svp saisir le bon format");
           }
        }while (action_enum == null);
        return action_enum;
    }

    private static Action  getAction(String action) {
        for(Action e : Action.values()) {
            if(e.name().equalsIgnoreCase(action)) {
                return e;
            }
        }
        return null;
    }
}
