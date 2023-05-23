package google.drive.domain;

import google.drive.domain.*;
import google.drive.infra.AbstractEvent;
import java.util.*;
import lombok.*;

@Data
@ToString
public class FileDeleted extends AbstractEvent {

    private Long id;
    private String name;
    private String type;
    private Long size;

    public FileDeleted(File aggregate){
        super(aggregate);
    }
    public FileDeleted(){
        super();
    }
}
