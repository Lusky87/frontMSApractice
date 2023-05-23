package google.drive.domain;

import google.drive.domain.*;
import google.drive.infra.AbstractEvent;
import java.util.*;
import lombok.*;

@Data
@ToString
public class Indexed extends AbstractEvent {

    private Long id;
    private List<String> keywords;
    private String fileKey;

    public Indexed(Index aggregate){
        super(aggregate);
    }
    public Indexed(){
        super();
    }
}
