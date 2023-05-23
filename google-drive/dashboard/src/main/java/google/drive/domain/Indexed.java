package google.drive.domain;

import google.drive.infra.AbstractEvent;
import lombok.Data;
import java.util.*;

@Data
public class Indexed extends AbstractEvent {

    private Long id;
    private List<String> keywords;
    private String fileKey;
}
